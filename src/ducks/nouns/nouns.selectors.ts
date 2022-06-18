import { createSelector } from 'reselect';
import { NounsState } from './nouns.types';

////////
// Selectors
////////

const nounInfoSelector = (state: NounsState) => state.nounInfo;

const nounAuctionInfoSelector = (state: NounsState) => state.nounAuctionInfo;

////////
// Create selectors
////////

// common
export const getNounInfo = createSelector(
  nounInfoSelector,
  (nounInfo) => nounInfo,
);

export const getNounAuctionInfo = createSelector(
  nounAuctionInfoSelector,
  (nounAuctionInfo) => nounAuctionInfo,
);
