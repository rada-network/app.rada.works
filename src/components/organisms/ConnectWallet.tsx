import React, { FunctionComponent, Fragment } from 'react';
import Button from '../atoms/Button';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet } from 'src/ducks/wallets/wallets.operations';
import styles from './ConnectWallet.module.css';

export type ConnectWalletProps = {
  name?: string;
};

const ConnectWallet: FunctionComponent<ConnectWalletProps> = () => {
  const dispatch = useDispatch();
  const walletsSelector = useSelector((state) => state.wallets);

  const connect = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions: {},
      });
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      if (!accounts || accounts.length === 0) {
        throw new Error('No account');
      }

      const chainId = await web3.eth.getChainId();
      const bscChainId = parseInt(process.env.BSC_CHAIN_ID as string);
      if (chainId !== bscChainId) {
        // TODO: enhance message.
        alert('Invalid bsc chain id. Need to switch to bsc testnet');
        throw new Error('Invalid bsc chain id. Need to switch to bsc testnet');
      }

      connectWallet(dispatch, provider, web3, accounts[0]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Fragment>
      {!walletsSelector.walletInfo && (
        <Button className={styles['btn-connect-wallet']} onClick={connect}>
          Connect metamask
        </Button>
      )}
      {walletsSelector.walletInfo && (
        <div>Account: {walletsSelector.walletInfo.account}</div>
      )}
    </Fragment>
  );
};

export default ConnectWallet;
