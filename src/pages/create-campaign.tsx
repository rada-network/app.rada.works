import React, { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import CreateCampaignTmpl from '../components/templates/createCampaignTmpl';

const CreateCampaignPage: NextPage = () => {
  const { status } = useSession();

  const { t } = useTranslation('create_campaign');

  let child = null;
  if (status === 'loading') {
    child = t('Session loading...');
  } else if (status === 'authenticated') {
    child = <CreateCampaignTmpl />;
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

export default CreateCampaignPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'createjob']))
      // Will be passed to the page component as props
    }
  };
}
