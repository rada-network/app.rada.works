import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: `${process.env.APP_INFURA_ID}` // required
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'rada.works App', // Required
      infuraId: `${process.env.APP_INFURA_ID}`, // Required
      rpc: {
        3: 'https://ropsten.infura.io/v3/'
      }, // Optional if `infuraId` is provided; otherwise it's required
      chainId: 3, // Optional. It defaults to 1 if not provided
      darkMode: true // Optional. Use dark theme, defaults to false
    }
  },
  binancechainwallet: {
    package: true
  }
};
export default providerOptions;
