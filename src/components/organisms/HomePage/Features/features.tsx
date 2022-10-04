import React, { Fragment } from 'react';
import classes from './features.module.css';
import useThemes from 'src/hooks/useThemes';

const Features = () => {
  const { isDark } = useThemes();
  const rootClass = isDark ? classes.rootDark : classes.root;
  return (
    <Fragment>
      <div className={`${rootClass} bg-white`}>
        <div className="container max-w-screen-xl mx-auto py-20 px-4">
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
              <h3 className="my-0 text-xl lg:text-3xl font-bold text-gray-800 mb-4">
                Incentivized participation
              </h3>
              <p className="my-0">
                Users earn rewards by completing tasks. No extra steps, no KYC
              </p>
            </div>

            <div className="basis-full md:basis-1/4 text-center mb-12 md:mb-0">
              <div className="mb-4">
                <img src="/samples/sample-feature.svg" alt="Sample feature" />
              </div>
              <h3 className="my-0 text-xl lg:text-3xl text-gray-800 mb-4">
                Chain-agnostic
              </h3>
              <p className="my-0">
                No more pain switching between chains. One profile with verified
                identity can enjoy perks on any chain.
              </p>
            </div>

            <div className="basis-full md:basis-1/4 text-center mb-12 md:mb-0">
              <div className="mb-4">
                <img src="/samples/sample-feature.svg" alt="Sample feature" />
              </div>
              <h3 className="my-0 text-xl lg:text-2xl font-extrabold text-gray-800 mb-4">
                Rewards, aggregated
              </h3>
              <p className="my-0">
                Verified Souls get privileged access to various allow-lists, all
                in one place.
              </p>
            </div>

            <div className="basis-full md:basis-1/4 text-center">
              <div className="mb-4">
                <img src="/samples/sample-feature.svg" alt="Sample feature" />
              </div>
              <h3 className="my-0 text-xl lg:text-2xl font-extrabold text-gray-800 mb-4">
                No-code campaign creator tool
              </h3>
              <p className="my-0">
                Projects can freely apply to create a campaign and reward users
                via SoulBound tokens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Features;