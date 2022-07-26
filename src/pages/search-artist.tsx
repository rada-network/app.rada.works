import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import FindaJob from '../components/templates/FindaJob';
import ConnectWallet from '../components/organisms/ConnectWallet';

const SearchArtist: NextPage = () => {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const child = status == 'authenticated' ? <FindaJob /> : <ConnectWallet />;

  return child;
};

export default SearchArtist;
