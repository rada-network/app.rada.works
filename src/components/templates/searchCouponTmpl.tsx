/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import MainTmpl from './_mainTmpl';
import List from '../organisms/Campaign/List';

const SearchCouponTmpl = () => {
  return (
    <Fragment>
      <MainTmpl>
        <List page="search-coupon" />
      </MainTmpl>
    </Fragment>
  );
};

SearchCouponTmpl.propTypes = {
  classes: shape({
    root: string
  })
};

export default SearchCouponTmpl;
