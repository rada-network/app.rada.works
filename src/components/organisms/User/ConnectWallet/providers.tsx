import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      chainId: 3, // Optional. It defaults to 1 if not provided
      darkMode: true, // Optional. Use dark theme, defaults to false
      infuraId: `e235447999794e278bf4a75bd8921e23` // required
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'rada.works App', // Required
      infuraId: `e235447999794e278bf4a75bd8921e23`, // Required
      rpc: '', // Optional if `infuraId` is provided; otherwise it's required
      chainId: 3, // Optional. It defaults to 1 if not provided
      darkMode: true // Optional. Use dark theme, defaults to false
    }
  },
  binancechainwallet: {
    package: true
  }
};
export default providerOptions;
