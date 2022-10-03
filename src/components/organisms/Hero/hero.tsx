import React, { Fragment } from 'react';
import classes from './hero.module.css';
const Hero = () => {
  return (
    <Fragment>
      <div className={`${classes.root} bg-[#a5f3fc] relative`}>
        <div className="container max-w-screen-xl mx-auto px-4 lg:px-4 z-10 relative">
          <div className="flex flex-wrap items-center py-16">
            <div className="basis-full lg:basis-7/12 text-center lg:text-left pr-4">
              <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-relaxed uppercase tracking-tight mt-0 mb-6">
                <span className="text-purple-600">SoulMint</span>
                <span className="block">
                  the reward-focused platform for verifiable credentials
                </span>
              </h1>
              <p className="text-2xl font-normal mt-0 mb-12 space-mono text-gray-900">
                Build your <strong>Web3</strong> reputation through your{' '}
                <strong>SoulBound</strong> tokens. Explore and earn special
                rewards, curated by us.
              </p>

              <div className="mt-8">
                <a
                  href="#"
                  title="View more"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3.5 inline-flex items-center justify-center transition-all duration-300 w-44 uppercase tracking-wide"
                >
                  Learn more
                  <svg
                    className="h-4 w-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </a>
              </div>
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
