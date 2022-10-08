import React, { Fragment } from 'react';
import classes from './features.module.css';
import useThemes from 'src/hooks/useThemes';

const Features = () => {
  const { isDark } = useThemes();
  const rootClass = isDark ? classes.rootDark : classes.root;
  return (
    <Fragment>
      <div className={`${rootClass} bg-white`}>
        <div className="container max-w-screen-xl mx-auto py-12 lg:py-24 px-4">
          <div className="mb-20 text-center">
            <h2 className="text-center text-4xl lg:text-6xl font-bold text-gray-800 dark:text-white mt-0 mb-0 tracking-tight">
              SoulMint Features
            </h2>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-start gap-8">
            <div className="basis-full md:basis-1/4 text-center mb-12 md:mb-0">
              <div className="mb-4">
                <img src="/samples/sample-feature.svg" alt="Sample feature" />
              </div>
              <h3 className="my-0 text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                SoulBound Token curator
              </h3>
              <p className="my-0 text-lg">
                Issue non-transferable NFT as on-chain credentials
              </p>
            </div>

            <div className="basis-full md:basis-1/4 text-center mb-12 md:mb-0">
              <div className="mb-4">
                <img src="/samples/sample-feature.svg" alt="Sample feature" />
              </div>
              <h3 className="my-0 text-xl lg:text-2xl text-gray-800 mb-4 font-extrabold">
                Chain agnostic
              </h3>
              <p className="my-0 text-lg">
                No more pain switching between chains. Enjoy perks on
                multi-chain.
              </p>
            </div>

            <div className="basis-full md:basis-1/4 text-center mb-12 md:mb-0">
              <div className="mb-4">
                <img src="/samples/sample-feature.svg" alt="Sample feature" />
              </div>
              <h3 className="my-0 text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                No-code campaign creator
              </h3>
              <p className="my-0 text-xl">
                Easily create a campaign with customized social task.
              </p>
            </div>

            <div className="basis-full md:basis-1/4 text-center">
              <div className="mb-4">
                <img src="/samples/sample-feature.svg" alt="Sample feature" />
              </div>
              <h3 className="my-0 text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                On-chain reward distribution
              </h3>
              <p className="my-0 text-lg">
                Distribute rewards through smart-contract
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Features;
