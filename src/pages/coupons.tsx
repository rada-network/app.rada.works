import React from 'react';
import { NextPage } from 'next';
//import { useRouter } from 'next/router';
//import { useSession } from 'next-auth/react';
import SearchCouponTmpl from '../components/templates/searchCouponTmpl';

const Coupons: NextPage = () => {
  //const router = useRouter();
  //const { status } = useSession();

  return <SearchCouponTmpl />;
};

export default Coupons;
