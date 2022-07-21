/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

const MainTmpl = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

MainTmpl.propTypes = {};

export default MainTmpl;
