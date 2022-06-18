import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useCurrentTokenId } from 'src/libs/useCurrentTokenId';
import BiddingHistory, {
  BiddingHistoryProps,
} from 'src/components/templates/BiddingHistory';
import { fetchTokenIdBiddingHistory } from 'src/ducks/nouns/nouns.operations';

const BiddingHistoryPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const nounsSelector = useSelector((state) => state.nouns);
  const currentTokenId = useCurrentTokenId();

  useEffect(() => {
    if (router.isReady && currentTokenId) {
      fetchTokenIdBiddingHistory(dispatch, currentTokenId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!currentTokenId) {
    return <>Undefined token id</>;
  }

  const biddingHistoryProps: BiddingHistoryProps = {
    tokenId: currentTokenId,
    biddings: nounsSelector.biddings ?? [],
  };

  return <BiddingHistory {...biddingHistoryProps} />;
};

export default BiddingHistoryPage;
