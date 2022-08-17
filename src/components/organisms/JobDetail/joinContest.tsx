import React, { Fragment } from 'react';
export const JoinContest = (props: any) => {
  console.log(props);
  return (
    <Fragment>
      <div className="dark:bg-gray-800 border border-2 border-purple-500 rounded-lg p-6 flex items-center">
        <span className="bg-gray-200 dark:bg-gray-700 h-12 w-12 flex items-center justify-center rounded-full mr-4">
          <img src="/ico-question.svg" alt="info" className="w-5 h-5" />
        </span>
        <h3 className="text-lg text-gray-700 dark:text-white font-medium my-0">
          How to joinContest
        </h3>
      </div>
    </Fragment>
  );
};
