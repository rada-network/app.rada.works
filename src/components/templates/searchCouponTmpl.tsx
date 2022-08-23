/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import MainTmpl from './_mainTmpl';
// import Joblist from '../organisms/JobList';

const SearchCouponTmpl = () => {
  return (
    <Fragment>
      <MainTmpl>
        {/*<Joblist page="joblist" />*/}
        Coming soon...
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
