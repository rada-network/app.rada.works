import React, { Fragment } from 'react';
import classes from './hero.module.css';
const Hero = () => {
  return (
    <Fragment>
      <div className={`${classes.root} bg-[#5fe0b0] relative`}>
        <div className="container max-w-screen-xl mx-auto px-4 lg:px-4 z-10 relative">
          <div className="flex flex-wrap items-center py-10 md:py-16 lg:py-16">
            <div className="basis-full lg:basis-7/12 text-center lg:text-left pr-4">
              <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-relaxed tracking-tight mt-0 mb-8 font-pt-ui tracking-tight">
                <span className="text-violet-600">SoulMint</span>
                <span className="block">
                  the reward-focused platform for verifiable credentials
                </span>
              </h1>
              <p className="lg:text-2xl font-normal my-0 text-gray-900">
                Build your <strong>Web3</strong> reputation through your{' '}
                <strong>SoulBound</strong> tokens. Explore and earn special
                rewards, curated by us.
              </p>
            </div>

            <div className="hidden lg:flex justify-end basis-5/12 text-right pl-4">
              <img src="hero-1.png" alt="Hero decor" />
            </div>
          </div>
        </div>
        <div
          className={`${classes.heroMask} absolute top-0 right-0 bottom-0 left-0 opacity-60`}
        />
      </div>
    </Fragment>
  );
};

export default Hero;
