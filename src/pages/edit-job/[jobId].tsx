import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import CreateJobTmpl from '../../components/templates/CreateJobTmpl';
import ConnectWallet from '../../components/organisms/ConnectWallet';

const EditJobPage: NextPage = () => {
  const { status } = useSession();

  const router = useRouter();
  const currentJobId = router.query.jobId as string;

  let child = null;
  if (status == 'authenticated') {
    child = <CreateJobTmpl jobId={currentJobId} />;
  } else {
    child = <ConnectWallet />;
  }

  return child;
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
