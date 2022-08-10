import React, { Fragment } from 'react';

export const DateCounting = (props: any) => {
  console.log(props);
  return (
    <Fragment>
      <div
        className="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
        role="alert"
      >
        <img src="/info.svg" alt="info" className="w-4 h-4 mr-2" />
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Info alert!</span> Change a few things
          up and try submitting again.
        </div>
      </div>
    </Fragment>
  );
};
