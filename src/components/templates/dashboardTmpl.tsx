import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import Dashboard from '../organisms/Dashboard';

const DashboardTmpl = (props: any) => {
  const { walletAddress } = props;

  const child = <Dashboard walletAddress={walletAddress} />;

  return (
    <Fragment>
      <MainTmpl> {child} </MainTmpl>
    </Fragment>
  );
};

export default DashboardTmpl;
