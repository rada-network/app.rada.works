/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Toast from '../organisms/Toast';

const MainTmpl = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <Header />
      <main className="mx-auto max-w-screen-xl py-12">{children}</main>
      <Footer />
      <Toast />
    </Fragment>
  );
};

MainTmpl.propTypes = {};

export default MainTmpl;
