import React, { Fragment } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Hero from '../organisms/Hero';
import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

const HomeTmpl = (props) => {
  return (
    <Fragment>
      <Header />
      <Hero />
      <Footer />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

HomeTmpl.propTypes = {};

export default HomeTmpl;
