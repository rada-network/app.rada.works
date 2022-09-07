import React, { Fragment } from 'react';
import Router, { useRouter } from 'next/router';
import { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import CreateCampaignTmpl from '../../components/templates/createCampaignTmpl';

const EditCampaignPage: NextPage = () => {
  const { status } = useSession();

  const { t } = useTranslation('create_campaign');

  const router = useRouter();
  const id = router.query.id as string;

  let child = null;
  if (status == 'loading') {
    child = t('Session loading...');
  } else if (status == 'authenticated') {
    child = <CreateCampaignTmpl campaignId={id} />;
  } else {
    Router.push('/');
  }

  return <Fragment>{child}</Fragment>;
};

export default EditCampaignPage;

export async function getStaticProps(props: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(props.locale, [
        'common',
        'create_campaign'
      ]))
      // Will be passed to the page component as props
    }
  };
}

export const getStaticPaths: GetStaticPaths<{ jobId: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  };
};
