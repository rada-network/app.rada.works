import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import HomeTmpl from '../components/templates/homeTmpl';

const HomePage: NextPage = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  const child = <HomeTmpl />;

  return child;
};

export default HomePage;
