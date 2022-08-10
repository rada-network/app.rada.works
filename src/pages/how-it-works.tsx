import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const HowItWorks: NextPage = () => {
  const { status } = useSession();

  let child = null;
  if (status == 'loading') {
    child = 'Loading...';
  } else if (status == 'authenticated') {
    child = '[Coming soon] How it works...';
  }

  return <Fragment>{child}</Fragment>;
};

export default HowItWorks;
