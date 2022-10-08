import React, { Fragment } from 'react';
import classes from './hero.module.css';
const Hero = () => {
  return (
    <Fragment>
      <div className={`${classes.root} bg-[#5fe0b0] relative`}>
        <div className="container max-w-screen-xl mx-auto px-4 lg:px-4 z-10">
          <div className="flex flex-wrap items-center py-10 md:py-16 lg:py-16">
            <div className="basis-full lg:basis-7/12 text-center lg:text-left lg:pr-4">
              <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 dark:text-white lg:leading-relaxed tracking-tight mt-0 mb-4 lg:mb-8 font-pt-ui">
                <span className="text-violet-600">SoulMint</span>
                <span className="block">
                  Reward distribution platform for SoulBound Tokens
                </span>
              </h1>
              <p className="text-lg lg:text-2xl font-normal my-0 text-gray-900">
                Build your Web3 reputation through SoulBound Tokens. Explore and
                earn.
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
