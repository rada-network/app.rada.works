/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import List from '../organisms/Campaign/List';

const HomeTmpl = (props) => {
  return (
    <Fragment>
      <MainTmpl>
        <List position="home-page" />
      </MainTmpl>
    </Fragment>
  );
};

HomeTmpl.propTypes = {};

export default HomeTmpl;
