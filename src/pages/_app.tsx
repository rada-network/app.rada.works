import React from 'react';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../libs/apolloClient';

import { Provider } from 'react-redux';
import { useStore } from 'src/libs/redux';

import { SessionProvider, signOut, useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';
// import { useRouter } from "next/router";

import dynamic from 'next/dynamic';
const FullPageLoader = dynamic(
  () => import('../components/organisms/FullPageLoader')
);
const Toast = dynamic(() => import('../components/organisms/Toast'));
const Providers = dynamic(() => import('../utils/providers'));
import Head from 'next/head';
import BrowserPersistence from '../utils/simplePersistence';

const MyApp = function MyApp({
  Component,
  pageProps: { session: Session, ...pageProps }
}: AppProps) {
  // const router = useRouter();
  // const store = useStore();
  const { data: session } = useSession();
  const [accessToken, setAccessToken] = useState(null);
  const localStorage = new BrowserPersistence();

  useEffect(() => {
    if (session && session.access_token) {
      setAccessToken(session.access_token);
    }
    if (session?.error === 'RefreshAccessTokenError') {
      localStorage.removeItem('user');
      signOut();
    }
    // return () => {};
  }, [session /*, store*/]);

  useEffect(() => {
    if (session) {
      //saving for other contexts
      const userData = {
        ...session.user,
        id: session.id,
        access_token: accessToken
      };
      localStorage.setItem('user', userData);
      console.log('USER:', localStorage.getItem('user'));
    }
    // return () => {};
  }, [accessToken, session]);

  return (
    <Providers>
      <Head>
        <title>SoulMint - The 1st SoulBound</title>
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
};

const SoulMintApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  const apolloClient = useApollo(
    pageProps.initialApolloState ? pageProps.initialApolloState : null
  );
  const store = useStore();
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <FullPageLoader />
          <SessionProvider session={session} refetchInterval={20 * 60}>
            <MyApp Component={Component} pageProps={pageProps} router={null} />
            <Toast />
          </SessionProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(SoulMintApp);
