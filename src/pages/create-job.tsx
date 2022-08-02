import React from 'react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import CreateJobTmpl from '../components/templates/CreateJobTmpl';
import ConnectWallet from '../components/organisms/ConnectWallet';

const CreateJobPage: NextPage = () => {
  const { status } = useSession();

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
