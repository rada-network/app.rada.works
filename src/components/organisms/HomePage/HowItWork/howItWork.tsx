import React, { Fragment } from 'react';
import useThemes from 'src/hooks/useThemes';
import classes from './howItWork.module.css';
const HowItWork = () => {
  const { isDark } = useThemes();
  const rootClass = isDark ? classes.rootDark : classes.root;
  return (
    <Fragment>
      <div className={`${rootClass} bg-violet-600 dark:bg-violet-600`}>
        <div className="container max-w-screen-xl mx-auto py-12 lg:py-24 px-4">
          <div className="mb-12 lg:mb-20 text-center">
            <h2 className="text-center text-4xl lg:text-6xl font-semibold text-white dark:text-white mt-0 mb-0 tracking-tight">
              How it works
            </h2>
          </div>

          <div
            className={`${classes.steps} flex flex-wrap items-start justify-center`}
          >
            <div className="flex flex-row lg:flex-col items-center lg:text-center px-4 basis-full md:basis-1/2 lg:basis-1/4 mb-8 lg:mb-0">
              <span className="bg-white text-violet-600 flex items-center justify-center h-10 w-10 lg:h-16 lg:w-16 rounded-full ring-4 ring-violet-700 text-lg lg:text-2xl font-bold mb-2 lg:mb-8 mr-4 lg:mr-0">
                1
              </span>
              <h4 className="flex-1 font-semibold lg:font-normal text-white lg:text-xl">Connect wallet</h4>
            </div>

            <div className="flex flex-row lg:flex-col items-center lg:text-center px-4 basis-full md:basis-1/2 lg:basis-1/4 mb-8 lg:mb-0">
              <span className="bg-white text-violet-600 flex items-center justify-center h-10 w-10 lg:h-16 lg:w-16 rounded-full ring-4 ring-violet-700 text-lg lg:text-2xl font-bold mb-2 lg:mb-8 mr-4 lg:mr-0">
                2
              </span>
              <h4 className="flex-1 font-semibold lg:font-normal text-white lg:text-xl">
                Browse available campaigns
              </h4>
            </div>

            <div className="flex flex-row lg:flex-col items-center text-center px-4 basis-full md:basis-1/2 lg:basis-1/4 mb-8 lg:mb-0">
              <span className="bg-white text-violet-600 flex items-center justify-center h-10 w-10 lg:h-16 lg:w-16 rounded-full ring-4 ring-violet-700 text-lg lg:text-2xl font-bold mb-2 lg:mb-8 mr-4 lg:mr-0">
                3
              </span>
              <h4 className="flex-1 font-semibold lg:font-normal text-white lg:text-xl">
                Complete tasks and receive rewards
              </h4>
            </div>

            <div className="flex flex-row lg:flex-col items-center lg:text-center px-4 basis-full md:basis-1/2 lg:basis-1/4 mb-8 lg:mb-0">
              <span className="block bg-white text-violet-600 flex items-center justify-center h-10 w-10 lg:h-16 lg:w-16 rounded-full ring-4 ring-violet-700 text-lg lg:text-2xl font-bold mb-2 lg:mb-8 mr-4 lg:mr-0">
                4
              </span>
              <h4 className="flex-1 font-semibold lg:font-normal text-white lg:text-xl">
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
