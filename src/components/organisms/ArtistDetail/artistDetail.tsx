import React, { Fragment } from 'react';

const ArtistDetail = (props: { data: any }) => {
  const { data } = props;
  return (
    <Fragment>
      <div>Artist In Contest (39)</div>
      <div>
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
    </Fragment>
  );
};
export default ArtistDetail;
