import React from 'react';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useStore } from 'src/libs/redux';
import { Web3Provider } from 'src/libs/web3-context';
import { SessionProvider, signOut } from 'next-auth/react';
import { useApollo } from '../libs/apolloClient';
import Toast from '../components/organisms/Toast';
import { ThemeProvider } from 'next-themes';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import BrowserPersistence from '../utils/simplePersistence';
import {
  checkExistsSocialLink,
  saveSocialLink
} from 'src/hooks/User/useSocial';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const store = useStore();

  getSession().then(async (session) => {
    const storage = new BrowserPersistence();
    if (session && session.access_token) {
      storage.setItem('access_token', session.access_token, 24 * 60 * 60); //1 days
      //Auto sync social link if is social login
      const twUserProfile: any = session?.twUserProfile;
      if (twUserProfile) {
        //check exits
        const found = await checkExistsSocialLink(
          { _eq: session.provider },
          { _eq: `${twUserProfile.userId}` }
        );
        if (!found) {
          await saveSocialLink({
            name: session.provider,
            username: twUserProfile?.screenName,
            uid: twUserProfile.userId ? `${twUserProfile.userId}` : null
          });
        }
      }
    } else {
      storage.removeItem('access_token');
    }
    if (session?.error === 'RefreshAccessTokenError') {
      signOut(); // Force sign in to hopefully resolve error
    }
  });
  const apolloClient = useApollo(
    pageProps.initialApolloState ? pageProps.initialApolloState : null
  );

  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <SessionProvider session={session} refetchInterval={20 * 60}>
            <Web3Provider>
              <Head>
                <title>SoulMint - The 1st SoulBound</title>
              </Head>
              <Component {...pageProps} />
              <Toast />
            </Web3Provider>
          </SessionProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
