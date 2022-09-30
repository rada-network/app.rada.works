import React, { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import MyCampaignTmpl from '../components/templates/myCampaignTmpl';

const Dashboard: NextPage = () => {
  const { data, status } = useSession();

  const child =
    status === 'authenticated' ? (
      <MyCampaignTmpl walletAddress={data?.user?.email} />
    ) : null;

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/');
    }
  }, [status]);

  return <Fragment> {child} </Fragment>;
};

export default Dashboard;

export async function getStaticProps(props: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(props.locale, ['common', 'dashboard']))
      // Will be passed to the page component as props
    }
  };
}
