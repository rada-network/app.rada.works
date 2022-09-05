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

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const providers = [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'BSC',
      credentials: {},
      async authorize(credentials: any) {
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
      maxAge: 20 * 60 // 20 minutes
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ user, account }) {
        const emailUser = user?.email || '';
        console.log('emailUser', emailUser);
        const checkUser = await isExistsUser(emailUser);
        console.log('account', account);
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
            provider: account.provider,
            status: 'active'
          });
          checkUser.id = CreateUser.id;
        }
        console.log('checkUser', checkUser);
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
      async jwt({ token, user }) {
        // Persist the OAuth access_token to the token right after signin
        if (user) {
          token.access_token = user.access_token;
          token.id = user.id;
          token.refresh_token = user.refresh_token;
        }
        return token;
      },
      async session({ session, token }) {
        session.id = token.id;
        session.access_token = token.access_token;
        if (session) {
          const { valid } = getTokenState(session.access_token);
          if (!valid) {
            const directusToken = await authRefresh({
              refresh_token: token.refresh_token
            });
            session.access_token = directusToken.auth_refresh.access_token;
          }
        }
        console.log('session', session);
        return session;
      }
    }
  });
}
