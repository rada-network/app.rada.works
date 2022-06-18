import { Bidding, NounsActionType } from './nouns.types';
import BigNumber from 'bignumber.js';

export const setCurrentTokenId = (tokenId: number) => {
  return {
    type: NounsActionType.setCurrentTokenId,
    payload: tokenId,
  };
};

export const setNounInfoAction = (
  name: string,
  description: string,
  imageSrc: string,
  ownerAddress: string,
) => {
  return {
    type: NounsActionType.setNounInfo,
    payload: {
      name,
      description,
      imageSrc,
      ownerAddress,
    },
  };
};

export const setNounAuctionAction = (
  nftId: number,
  amount: BigNumber,
  startTime: Date,
  endTime: Date,
  bidder: string,
  settled: boolean,
) => {
  return {
    type: NounsActionType.setNounAuctionInfo,
    payload: {
      nftId,
      amount,
      startTime,
      endTime,
      bidder,
      settled,
    },
  };
};

export const setBiddingsAction = (biddings: Bidding[]) => {
  return {
    type: NounsActionType.setBiddings,
    payload: biddings,
  };
};
