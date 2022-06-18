import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';
import { useStore } from 'src/libs/redux';
import { Web3Provider } from 'src/libs/web3-context';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();

  return (
    <Provider store={store}>
      <Web3Provider>
        <MoralisProvider
          serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
          appId={process.env.NEXT_PUBLIC_APP_ID as string}
        >
          <Component {...pageProps} />
        </MoralisProvider>
      </Web3Provider>
    </Provider>
  );
}

export default MyApp;
