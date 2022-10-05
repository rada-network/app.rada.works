import React, { Fragment } from 'react';
import useThemes from 'src/hooks/useThemes';
import classes from './howItWork.module.css';
const HowItWork = () => {
  const { isDark } = useThemes();
  const rootClass = isDark ? classes.rootDark : classes.root;
  return (
    <Fragment>
      <div className={`${rootClass} bg-violet-600 dark:bg-gray-800`}>
        <div className="container max-w-screen-xl mx-auto py-24">
          <div className="mb-20 text-center">
            <h2 className="text-center text-3xl md:text-4xl lg:text-6xl font-semibold text-white dark:text-white mt-0 mb-0 tracking-tight">
              How it works
            </h2>
          </div>

          <div
            className={`${classes.steps} flex flex-wrap items-start justify-center`}
          >
            <div className="flex flex-col items-center text-center px-4 basis-full md:basis-1/2 lg:basis-1/4">
              <span className="bg-white text-violet-600 flex items-center justify-center h-16 w-16 rounded-full ring-4 ring-violet-700 text-2xl font-bold mb-8">
                01
              </span>
              <h4 className="font-normal text-white text-lg">Connect wallet</h4>
            </div>

            <div className="flex flex-col items-center text-center px-4 basis-full md:basis-1/2 lg:basis-1/4">
              <span className="bg-white text-violet-600 flex items-center justify-center h-16 w-16 rounded-full text-2xl ring-4 ring-violet-700 font-bold mb-8">
                02
              </span>
              <h4 className="font-normal text-white text-lg">
                Browse available campaigns
              </h4>
            </div>

            <div className="flex flex-col items-center text-center px-4 basis-full md:basis-1/2 lg:basis-1/4">
              <span className="bg-white text-violet-600 flex items-center justify-center h-16 w-16 rounded-full text-2xl font-bold ring-4 ring-violet-700 mb-8">
                03
              </span>
              <h4 className="font-normal text-white text-lg">
                Complete tasks and receive rewards
              </h4>
            </div>

            <div className="flex flex-col items-center text-center px-4 basis-full md:basis-1/2 lg:basis-1/4">
              <span className="bg-white text-violet-600 flex items-center justify-center h-16 w-16 rounded-full text-2xl font-bold ring-4 ring-violet-700 mb-8">
                04
              </span>
              <h4 className="font-normal text-white text-lg">
                Manage your profile &amp; view achievements
              </h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HowItWork;
