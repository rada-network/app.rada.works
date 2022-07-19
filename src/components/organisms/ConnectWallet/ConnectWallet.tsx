import React, { FunctionComponent, Fragment } from 'react';
import Web3 from 'web3';
import Web3Modal /*, { providers }*/ from 'web3modal';
import { useDispatch /*, useSelector*/ } from 'react-redux';
import { connectWallet } from 'src/ducks/wallets/wallets.operations';
import Button from '../../atoms/Button';
import { useSession, getCsrfToken, signIn, signOut } from 'next-auth/react';
import { ethers } from 'ethers';
import { useTranslation } from 'next-i18next';
import classes from './ConnectWallet.module.css';

export type ConnectWalletProps = {
  name?: string;
};

const ConnectWallet: FunctionComponent<ConnectWalletProps> = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const { t } = useTranslation('common');

  const connect = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions: {}
      });
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      const pp = new ethers.providers.Web3Provider(provider);

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
      let signedMessage;
      const rawMessage = '0x' + (await getCsrfToken()) || '';
      const callbackUrl = '/';
      const signer = pp.getSigner();
      // eslint-disable-next-line prefer-const
      signedMessage = await signer.signMessage(rawMessage);
      await signIn('credentials', {
        message: rawMessage,
        redirect: false,
        address: accounts[0],
        signedMessage,
        callbackUrl
      });
      connectWallet(dispatch, provider, web3, accounts[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const disConnect = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const child =
    status === 'authenticated' ? (
      <div>
        <div>Account: {session?.user?.name}</div>
        <Button
          priority="high"
          type="button"
          className={classes.btnLogout}
          onClick={disConnect}
        >
          {t('Sign out')}
        </Button>
      </div>
    ) : (
      <Button
        priority="high"
        type="button"
        className={classes.btnLogin}
        onClick={connect}
      >
        {t('Connect Metamask')}
      </Button>
    );

  return <Fragment>{child}</Fragment>;
};

export default ConnectWallet;
