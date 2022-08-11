import React, { Fragment } from 'react';

export const ArtistDetail = (props: { data: any }) => {
  const { data } = props;
  return (
    <Fragment>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700 py-4 px-6">
          <h3 className="text-gray-700 dark:text-white text-lg text-bold">
            Artist In Contest (39)
          </h3>
        </div>
        <div className="p-6">
          <ul className="flex">
            <li className="flex flex-auto">
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src={data?.avatar ? data?.avatar : 'https://picsum.photos/200'}
              />
            </li>
            <li className="flex flex-auto">
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src={data?.avatar ? data?.avatar : 'https://picsum.photos/200'}
              />
            </li>
            <li className="flex flex-auto">
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src={data?.avatar ? data?.avatar : 'https://picsum.photos/200'}
              />
            </li>
            <li className="flex flex-auto">
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src={data?.avatar ? data?.avatar : 'https://picsum.photos/200'}
              />
            </li>
            <li className="flex flex-auto">
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src={data?.avatar ? data?.avatar : 'https://picsum.photos/200'}
              />
            </li>
            <li className="flex flex-auto">
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src={data?.avatar ? data?.avatar : 'https://picsum.photos/200'}
              />
            </li>
            <li className="flex flex-auto">
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src={data?.avatar ? data?.avatar : 'https://picsum.photos/200'}
              />
            </li>
            <li className="flex flex-auto">
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src={data?.avatar ? data?.avatar : 'https://picsum.photos/200'}
              />
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
