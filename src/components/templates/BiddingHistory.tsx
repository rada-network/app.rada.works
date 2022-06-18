import React, { FunctionComponent, Fragment } from 'react';
import css from 'styled-jsx/css';
import BiddingHistoryList, {
  BiddingHistoryListProps,
} from '../organisms/BiddingHistoryList';

const styles = css`
  /* stylelint-disable */
`;

export type BiddingHistoryProps = BiddingHistoryListProps;

const BiddingHistory: FunctionComponent<BiddingHistoryProps> = ({
  biddings,
  tokenId,
}) => {
  return (
    <Fragment>
      <BiddingHistoryList tokenId={tokenId} biddings={biddings} />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default BiddingHistory;
