import React, { FunctionComponent, Fragment, useRef } from 'react';
import Button from '../atoms/Button';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { createBid } from 'src/ducks/wallets/wallets.operations';
import Input from '../atoms/Input';
import BigNumber from 'bignumber.js';
import { useWeb3Context } from 'src/libs/web3-context';
import styles from './CreateBidForm.module.css';
import { useRouter } from 'next/router';

export type CreateBidFormProps = {
  tokenId: number;
};

const CreateBidForm: FunctionComponent<CreateBidFormProps> = ({ tokenId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const web3Context = useWeb3Context();
  const walletsSelector = useSelector((state) => state.wallets);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const value = inputRef.current?.value ?? '0';
    const wei = new BigNumber(Web3.utils.toWei(value, 'ether'));
    createBid(
      dispatch,
      router,
      web3Context.bscWeb3 as Web3,
      tokenId,
      walletsSelector.walletInfo?.web3 as Web3,
      walletsSelector.walletInfo?.account as string,
      wei,
    );
  };

  return (
    <Fragment>
      <div className={styles['form-wrapper']}>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label className={styles['form-label']}>Amount</label>
            <Input
              className={styles['form-input']}
              type="text"
              innerRef={inputRef}
            />
          </div>

          <Button type="submit" className={styles['form-btn-submit']}>
            Create Bid
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateBidForm;
