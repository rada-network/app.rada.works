import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    access_token: string;
    error: string;
    user: {
      id: string;
      access_tooken: string;
      refresh_token: string;
      /** The user's postal address. */
      address: string;
    } & DefaultSession['user'];
  }
}
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Record<string, unknown>, DefaultJWT {
    /** OpenID ID Token */
    idToken?: string;
    error: string;
    access_tooken: string;
    refresh_token: string;
  }
}
