// import React, {useEffect} from 'react';
import { NextPage } from 'next';
// import { useRouter } from 'next/router';
import HomeTmpl from '../components/templates/HomeTmpl';

const HomePage: NextPage = () => {
  // const router = useRouter();
  // useEffect(() => {
  //
  // }, [router.isReady]);

  const child = <HomeTmpl />;

  return child;
};

export default HomePage;
