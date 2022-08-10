import React, { Fragment } from 'react';
import Router, { useRouter } from 'next/router';
import { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import CreateJobTmpl from '../../components/templates/CreateJobTmpl';
import { useTranslation } from 'next-i18next';

const EditJobPage: NextPage = () => {
  const { status } = useSession();

  const { t } = useTranslation('createjob');

  const router = useRouter();
  const currentJobId = router.query.jobId as string;

  let child = null;
  if (status == 'loading') {
    child = t('Session loading...');
  } else if (status == 'authenticated') {
    child = <CreateJobTmpl jobId={currentJobId} />;
  } else {
    Router.push('/');
  }

  return <Fragment>{child}</Fragment>;
};

export default EditJobPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'createjob']))
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
