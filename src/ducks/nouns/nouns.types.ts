import { Dispatch } from 'react';
import BigNumber from 'bignumber.js';

export type NounsState = {
  currentTokenId?: number;
  nounInfo?: {
    name: string;
    description: string;
    imageSrc: string;
    ownerAddress: string;
  };
  nounAuctionInfo?: {
    nftId: number;
    amount: BigNumber;
    startTime: Date;
    endTime: Date;
    bidder: string;
    settled: boolean;
  };
  biddings?: Bidding[];
};

export type Bidding = {
  transactionHash: string;
  fromAddress: string;
  nonce: string;
  biddedTokenId: number;
  biddedAmount: string;
};

export const NounsActionType = {
  setCurrentTokenId: 'setCurrentTokenId',
  setNounInfo: 'setNounInfo',
  setNounAuctionInfo: 'setNounAuctionInfo',
  setBiddings: 'setBiddings',
};

export type NounsActionType =
  typeof NounsActionType[keyof typeof NounsActionType];
export type NounsAction = { type: NounsActionType; payload?: any };

declare module 'react-redux' {
  interface DefaultRootState {
    nouns: NounsState;
  }
  export function useDispatch<TDispatch = Dispatch<NounsAction>>(): TDispatch;
}
