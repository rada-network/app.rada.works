import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import CreateJob from '../components/templates/CreateJob';
import ConnectWallet from '../components/organisms/ConnectWallet';

const CreateJobPage: NextPage = () => {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const child =
    status == 'authenticated' ? <CreateJob classes={{}} /> : <ConnectWallet />;

  return child;
};

export default CreateJobPage;
