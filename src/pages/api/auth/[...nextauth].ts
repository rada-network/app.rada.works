/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { utils } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const providers = [
    CredentialsProvider({
      name: 'Bsc',
      credentials: {},
      async authorize(credentials: any) {
        console.log('authorize', credentials);
        try {
          const nonce = '0x' + credentials?.csrfToken;
          const address = utils.verifyMessage(
            nonce,
            credentials?.signedMessage,
          );
          console.log(credentials?.address?.toLowerCase());
          console.log(address);
          if (address.toLowerCase() != credentials?.address?.toLowerCase())
            return null;
          //  create newUser or return existent user
          const user = {
            id: 1,
            name: address,
            email: 'jsmith@example.com',
            ...credentials,
          };
          //connect to directus create user & get access token

          //lay access token vao session
          return user;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === 'GET' && req.query.nextauth.includes('signin');

  // Hides Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        console.log(session);
        console.log(token);
        return session;
      },
    },
  });
}
