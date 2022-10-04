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
import BrowserPersistence from '../utils/simplePersistence';
import { saveSocialData } from 'src/hooks/User/useSocial';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const store = useStore();

  getSession().then(async (session) => {
    const storage = new BrowserPersistence();
    if (session && session.access_token) {
      storage.setItem(
        'access_token',
        session.access_token,
        24 * 60 * 60 * 1000
      );
      const userProfile = session?.userProfile;
      await saveSocialData({
        name: session.user.name,
        username: userProfile?.twitterHandle
      });
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
