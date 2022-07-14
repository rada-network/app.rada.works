import NounInfo, { NounInfoProps } from 'src/components/organisms/NounInfo';
import Header from 'src/components/organisms/Header';
import Footer from 'src/components/organisms/Footer';
import React, { FunctionComponent, Fragment } from 'react';
import css from 'styled-jsx/css';
import Hero from 'src/components/organisms/Hero';

const styles = css`
  /* stylelint-disable */
`;

export type HomeProps = NounInfoProps;

const Home: FunctionComponent<HomeProps> = ({ nounInfo, nounAuctionInfo }) => {
  return (
    <Fragment>
      <Header />
      <Hero />
      <NounInfo nounInfo={nounInfo} nounAuctionInfo={nounAuctionInfo} />
      <Footer />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default Home;
