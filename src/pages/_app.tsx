import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useStore } from 'src/libs/redux';
import { Web3Provider } from 'src/libs/web3-context';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { useApollo } from '../libs/apolloClient';
import Toast from '../components/organisms/Toast';
import { ThemeProvider } from 'next-themes';
import { getSession } from 'next-auth/react';
import BrowserPersistence from '../utils/simplePersistence';
import React from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const store = useStore();

  getSession().then((session) => {
    const storage = new BrowserPersistence();
    if (session && session.access_token) {
      storage.setItem('access_token', session.access_token, 1200);
    } else {
      console.log('====================================');
      console.log('session 2', session);
      console.log('====================================');
      storage.removeItem('access_token');
    }
    console.log('====================================');
    console.log('session app:', session);
    console.log('====================================');
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
          <SessionProvider session={session}>
            <Web3Provider>
              <Auth>
                <Component {...pageProps} />
              </Auth>
              <Toast />
            </Web3Provider>
          </SessionProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
function Auth({ children: child }: any): JSX.Element {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: false });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return child;
}
export default appWithTranslation(MyApp);
