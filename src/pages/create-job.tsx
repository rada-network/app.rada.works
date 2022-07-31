import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import CreateJobTmpl from '../components/templates/CreateJobTmpl';
import ConnectWallet from '../components/organisms/ConnectWallet';

const CreateJobPage: NextPage = () => {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const child =
    status == 'authenticated' ? <CreateJobTmpl /> : <ConnectWallet />;

  return child;
};

export default CreateJobPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'createjob']))
      // Will be passed to the page component as props
    }
  };
}
