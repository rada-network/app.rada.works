import {
  callCurrentNftId,
  callDataUri,
  callOwnerOf,
} from 'src/contracts/RadaToken';
import { Dispatch } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import Moralis from 'moralis';

import * as actions from './nouns.actions';
import { Bidding, NounsAction } from './nouns.types';
import { callAuction } from 'src/contracts/RadaAuctionHouse';
import { fromUnixTime } from 'date-fns';
export const fetchCurrentTokenId = async (
  dispatch: Dispatch<NounsAction>,
  web3: Web3,
) => {
  try {
    const data = await callCurrentNftId(web3);
    const currentTokenId = parseInt(data);

    dispatch(actions.setCurrentTokenId(currentTokenId));
  } catch (e) {
    console.error(e);
  }
};

export const fetchNounInfo = async (
  dispatch: Dispatch<NounsAction>,
  web3: Web3,
  tokenId: number,
) => {
  try {
    const data = await callDataUri(web3, tokenId);
    const buffer = Buffer.from(
      data.replace(/^data:\w+\/\w+;base64,/, ''),
      'base64',
    );
    const parsedData = JSON.parse(buffer.toString('utf-8'));

    const ownerAddress = await callOwnerOf(web3, tokenId);

    dispatch(
      actions.setNounInfoAction(
        parsedData.name,
        parsedData.description,
        parsedData.image,
        ownerAddress,
      ),
    );
  } catch (e) {
    dispatch(
      actions.setNounInfoAction(
        'unknown',
        'unknown',
        'https://nouns.wtf/static/media/loading-skull-noun.d7293d44.gif',
        '',
      ),
    );
  }
};

export const fetchNounAuctionInfo = async (
  dispatch: Dispatch<NounsAction>,
  web3: Web3,
) => {
  try {
    const data = await callAuction(web3);
    const nftId = parseInt(data.nftId);
    const amount = new BigNumber(data.amount);
    const startTime = fromUnixTime(parseInt(data.startTime));
    const endTime = fromUnixTime(parseInt(data.endTime));
    const bidder = data.bidder;
    const settled = data.settled;

    dispatch(
      actions.setNounAuctionAction(
        nftId,
        amount,
        startTime,
        endTime,
        bidder,
        settled,
      ),
    );
  } catch (e) {
    console.error('Error fetchNounAuctionInfo: ', e);
  }
};

export const filterBiddingHistory = (
  input: string,
  tokenId: number,
): boolean => {
  // TODO: improve code.
  if (!input.includes('0x659dd2b4')) {
    return false;
  }

  const inputTokenId = new BigNumber(input.slice(10), 16);
  if (tokenId.toString() !== inputTokenId.toString()) {
    return false;
  }

  return true;
};
export const fetchTokenIdBiddingHistory = async (
  dispatch: Dispatch<NounsAction>,
  tokenId: number,
) => {
  try {
    const transactions = await Moralis.Web3API.account.getTransactions({
      chain: 'bsc testnet',
      address: process.env.RADA_AUCTION_HOUSE_CONTRACT_ADDRESS as string,
      from_block: 0,
    });

    const createBidTransactions = transactions.result?.filter((tx) =>
      filterBiddingHistory(tx.input, tokenId),
    );

    if (!createBidTransactions) {
      return;
    }
    const biddings: Bidding[] = createBidTransactions.map((tx) => {
      return {
        transactionHash: tx.hash,
        fromAddress: tx.from_address,
        nonce: tx.nonce,
        biddedTokenId: tokenId,
        biddedAmount: Web3.utils.fromWei(tx.value, 'ether'),
      };
    });

    dispatch(actions.setBiddingsAction(biddings));
  } catch (e) {
    console.error('Error fetchTokenIdBiddingHistory: ', e);
  }
};
