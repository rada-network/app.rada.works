import NounInfo, { NounInfoProps } from 'src/components/organisms/NounInfo';
import React, { FunctionComponent, Fragment } from 'react';
import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

export type HomeProps = NounInfoProps;

const Home: FunctionComponent<HomeProps> = ({ nounInfo, nounAuctionInfo }) => {
  return (
    <Fragment>
      <NounInfo nounInfo={nounInfo} nounAuctionInfo={nounAuctionInfo} />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default Home;
