import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const useCurrentTokenId = (): number | undefined => {
  const router = useRouter();
  const nounsSelector = useSelector((state) => state.nouns);

  const queryParamTokenId = router.query.tokenId as string;

  if (queryParamTokenId) {
    const tokenId = parseInt(queryParamTokenId);
    return tokenId;
  }

  return nounsSelector.currentTokenId;
};
