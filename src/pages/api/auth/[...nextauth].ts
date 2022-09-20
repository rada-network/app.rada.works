import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import {
  isExistsUser,
  authLogin,
  authRefresh,
  createUser,
  getTokenState
} from '../../../hooks/User/useUsers';
import { utils } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
  try {
    console.log('refreshAccessToken', token);
    const refreshedTokens = await authRefresh({
      refresh_token: token.refresh_token
    });

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
  }
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const providers = [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      checks: 'none'
    }),
    FacebookProvider({
      clientId: `${process.env.FACEBOOK_CLIENT_ID}`,
      clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`
    }),
    CredentialsProvider({
      name: 'BSC',
      credentials: {},
      authorize: async (credentials: any) => {
        try {
          const nonce = '0x' + credentials?.csrfToken;
          const address = utils.verifyMessage(
            nonce,
            credentials?.signedMessage
          );
          if (address.toLowerCase() != credentials?.address?.toLowerCase())
            return null;
          const user = {
            email: address,
            name: address
          };
          console.log('authorize user', user);

          return user;
        } catch (e) {
          return null;
        }
      }
    })
  ];

  const isDefaultSigninPage =
    req.method === 'GET' && req.query.nextauth.includes('signin');

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: 'jwt', // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 15 * 60, // 20 minutes
      updateAge: 14 * 60 // 20 minutes
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        const emailUser = user?.email || '';
        if (
          account?.provider === 'credentials' &&
          email &&
          profile &&
          credentials
        ) {
          console.log('wallet connected');
        }
        const checkUser = await isExistsUser(emailUser);
        if (!checkUser?.id) {
          const CreateUser = await createUser({
            email: user.email,
            password: process.env.DIRECTUS_SUPER_ADMIN_PASSWORD,
            role: {
              id: process.env.DIRECTUS_DEFAULT_ROLE,
              name: 'Rada works',
              app_access: true,
              icon: 'supervised_user_circle',
              admin_access: false,
              enforce_tfa: false
            },
            provider: 'default',
            status: 'active'
          });
          checkUser.id = CreateUser.id;
        }
        //connect to directus create user & get access token
        const directusToken = await authLogin({
          email: user.email,
          password: process.env.DIRECTUS_SUPER_ADMIN_PASSWORD
        });
        user.access_token = directusToken.auth_login.access_token;
        user.refresh_token = directusToken.auth_login.refresh_token;
        user.id = checkUser.id;

        return true;
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
      async jwt({ token, user, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account && user) {
          token.access_token = user.access_token;
          token.id = user.id;
          token.refresh_token = user.refresh_token;
          console.log('user:', user);
          return token;
        }
        console.log(token.exp);

        const { valid } = getTokenState(token.access_token);
        // Return previous token if the access token has not expired yet
        if (valid) {
          console.log('token not expired');
          return token;
        }

        // Access token has expired, try to update it
        return refreshAccessToken(token);
      },
      async session({ session, token }) {
        session.id = token.id;
        session.access_token = token.access_token;
        session.error = token.error;

        if (session) {
          const { valid } = getTokenState(session.access_token);
          if (!valid) {
            console.log('session expired', session);
          }
        }
        return session;
      }
    }
  });
}
