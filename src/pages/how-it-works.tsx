import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const HowItWorks: NextPage = () => {
  const { status } = useSession();
  console.log(status);

  console.log('I am a nextjs > page...');

  return '[Coming soon] How it works...';
};

export default HowItWorks;
