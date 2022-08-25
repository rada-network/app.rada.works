import WalletConnect from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Web3Auth } from '@web3auth/web3auth';

const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID,
      chainID: 1
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Web3Modal Example App',
      infuraId: process.env.REACT_APP_INFURA_ID
    }
  },
  web3auth: {
    package: Web3Auth,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID
    }
  }
};
export default providerOptions;
