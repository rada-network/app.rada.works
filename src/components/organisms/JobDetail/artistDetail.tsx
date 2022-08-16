import React, { Fragment } from 'react';

export const ArtistDetail = (props: { data: any }) => {
  const { data } = props;
  return (
    <Fragment>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700 py-3 px-6">
          <h3 className="text-gray-700 dark:text-white text-lg font-medium">
            Artist In Contest (39)
          </h3>
        </div>
        <div className="p-6 pb-2">
          <ul className="flex flex-wrap justify-start">
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-1.png'}
              />
            </li>
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-2.png'}
              />
            </li>
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-3.png'}
              />
            </li>
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-4.png'}
              />
            </li>
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-5.png'}
              />
            </li>
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-6.png'}
              />
            </li>
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-7.png'}
              />
            </li>
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-8.png'}
              />
            </li>
            <li className="mr-4 mb-4">
              <img
                className={'avatar-sm w-12 h-12 rounded-full'}
                src={data?.avatar ? data?.avatar : '/samples/avt-9.png'}
              />
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
