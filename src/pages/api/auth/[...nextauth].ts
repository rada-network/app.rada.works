import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import Auth0Provider from 'next-auth/providers/auth0';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authLogin } from '../../../functions/users/Login.js';
import { useTheme } from 'next-themes';
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
console.log('====================================');
console.log(process.env);
console.log('====================================');
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
				 server: process.env.EMAIL_SERVER,
				 from: process.env.EMAIL_FROM,
			 }),
		// Temporarily removing the Apple provider from the demo site as the
		// callback URL for it needs updating due to Vercel changing domains

		Providers.Apple({
			clientId: process.env.APPLE_ID,
			clientSecret: {
				appleId: process.env.APPLE_ID,
				teamId: process.env.APPLE_TEAM_ID,
				privateKey: process.env.APPLE_PRIVATE_KEY,
				keyId: process.env.APPLE_KEY_ID,
			},
		}),
		*/
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER
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
          const createdUser = await createUser({
            email: address,
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
  ],
  theme: {
    colorScheme: 'light'
  },
  session: {
    strategy: 'jwt', //default
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 20 * 60 // 20 minutes
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const directusToken = await authLogin({
        email: user.email,
        password: process.env.DIRECTUS_SUPER_ADMIN_PASSWORD
      });
      console.log(directusToken);
      user.access_token = directusToken.auth_login.access_token;
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
      session.access_token = token.access_token;
      console.log(session);
      return session;
    }
  }
};

export default NextAuth(authOptions);
