import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import {
  isExistsUser,
  authLogin,
  createUser
} from '../../../hooks/User/useUsers';
import { utils } from 'ethers';
import { initializeApollo } from '../../../libs/SystemApolloClient.js';

const getApolloClient = () => {
  return initializeApollo();
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req, res) {
  const providers = [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    }),
    CredentialsProvider({
      name: 'Bsc',
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
          //  create newUser or return existent user
          // const createdUser = await createUser({
          //   email: address,
          //   password: process.env.DIRECTUS_SUPER_ADMIN_PASSWORD,
          //   role: {
          //     id: process.env.DIRECTUS_DEFAULT_ROLE,
          //     name: 'Rada works',
          //     app_access: true,
          //     icon: 'supervised_user_circle',
          //     admin_access: false,
          //     enforce_tfa: false
          //   },
          //   provider: 'default',
          //   status: 'active'
          // });
          const user = {
            email: address,
            name: address
          };
          //connect to directus create user & get access token

          //lay access token vao session
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
      strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        console.log('user: ', user);
        const emailUser = user?.email || '';
        const checkUser = await isExistsUser(emailUser);
        console.log('checkUser:', checkUser);
        if (!checkUser) {
          const createdUser = await createUser({
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
        }
        const directusToken = await authLogin({
          email: user.email,
          password: process.env.DIRECTUS_SUPER_ADMIN_PASSWORD
        });
        console.log(directusToken);
        user.access_token = directusToken.auth_login.access_token;
        user.id = directusToken.auth_login.id;

        return true;
      },
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token = user;
        }
        return token;
      },
      async session({ session, token, user }) {
        console.log('user: ', user);
        session.access_token = token.access_token;
        console.log(session);
        return session;
      }
    }
  });
}
