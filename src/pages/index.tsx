import { useWeb3Context } from 'src/libs/web3-context';
import type { NextPage } from 'next';
import Home, { HomeProps } from 'src/components/templates/Home';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCurrentTokenId,
  fetchNounAuctionInfo,
  fetchNounInfo,
} from 'src/ducks/nouns/nouns.operations';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import {
  getNounAuctionInfo,
  getNounInfo,
} from 'src/ducks/nouns/nouns.selectors';
import BigNumber from 'bignumber.js';
import { useCurrentTokenId } from 'src/libs/useCurrentTokenId';

const HomePage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const web3Context = useWeb3Context();
  const nounsSelector = useSelector((state) => state.nouns);
  const currentTokenId = useCurrentTokenId();

  useEffect(() => {
    if (router.isReady && currentTokenId) {
      fetchNounInfo(dispatch, web3Context.bscWeb3 as Web3, currentTokenId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, currentTokenId]);

  useEffect(() => {
    if (router.isReady) {
      fetchCurrentTokenId(dispatch, web3Context.bscWeb3 as Web3);
      fetchNounAuctionInfo(dispatch, web3Context.bscWeb3 as Web3);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const nounInfo = getNounInfo(nounsSelector);
  const nounAuctionInfo = getNounAuctionInfo(nounsSelector);

  const homeProps: HomeProps = {
    nounInfo: {
      name: nounInfo?.name ?? '',
      description: nounInfo?.description ?? '',
      imageSrc: nounInfo?.imageSrc ?? '',
      ownerAddress: nounInfo?.ownerAddress ?? '',
    },
    nounAuctionInfo: {
      nftId: nounAuctionInfo?.nftId ?? -1,
      amount: nounAuctionInfo?.amount ?? new BigNumber(0),
      startTime: nounAuctionInfo?.startTime ?? new Date(),
      endTime: nounAuctionInfo?.endTime ?? new Date(),
      bidder: nounAuctionInfo?.bidder ?? '',
      settled: nounAuctionInfo?.settled ?? false,
    },
  };

  return <Home {...homeProps} />;
};

export default HomePage;
