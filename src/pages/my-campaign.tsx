import React, { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import MyCampaignTmpl from '../components/templates/myCampaignTmpl';

const Dashboard: NextPage = () => {
  const { data, status } = useSession();

  const { t } = useTranslation('create_campaign');

  let child = null;
  if (status === 'loading') {
    child = t('Session loading...');
  } else if (status === 'authenticated') {
    const walletAddress = data?.user?.email;

    child = <MyCampaignTmpl walletAddress={walletAddress} />;
  } else {
    Router.push('/');
  }

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
