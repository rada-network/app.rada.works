import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { MoralisProvider } from 'react-moralis';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useStore } from 'src/libs/redux';
import { Web3Provider } from 'src/libs/web3-context';
import { SessionProvider } from 'next-auth/react';
import { useApollo } from '../libs/apolloClient';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const store = useStore();
  const apolloClient = useApollo(
    pageProps.initialApolloState ? pageProps.initialApolloState : null
  );

  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <SessionProvider session={session}>
            <Web3Provider>
              <MoralisProvider
                serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
                appId={process.env.NEXT_PUBLIC_APP_ID as string}
              >
                <Component {...pageProps} />
              </MoralisProvider>
            </Web3Provider>
          </SessionProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
