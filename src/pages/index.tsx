import React from 'react';
import { NextPage } from 'next';
import HomeTmpl from '../components/templates/homeTmpl';

const HomePage: NextPage = () => {
  const child = <HomeTmpl />;
  return child;
};

export default HomePage;
