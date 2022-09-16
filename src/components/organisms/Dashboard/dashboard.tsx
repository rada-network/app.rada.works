import React from 'react';

const Dashboard = (props: any) => {
  const { walletAddress } = props;

  return <div>Dashboard: {walletAddress}</div>;
};
export default Dashboard;
