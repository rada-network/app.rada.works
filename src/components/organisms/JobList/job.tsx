import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import Image from 'next/image';
import Router from 'next/router';
import slugify from 'slugify';

const Job = (props: {
  itemId: number;
  data: {
    id: number;
    user_id: { email: string /*token: number; avatar: string */ };
    description: string;
    owner_id: string;
    short_desc: string;
    title: string;
    status: string;
    date_updated: string;
    is_featured: boolean;
  };
}) => {
  const { itemId, data } = props;
  const handleClick = () => {
    console.log('clicked');
    const path = `/job-details/${slugify(data.title).toLowerCase()}`;
    Router.push(path);
  };
  return (
    <Fragment key={itemId}>
      <div
        className={
          'border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow flex flex-col items-stretch'
        }
        onClick={handleClick}
      >
        <div className={'flex items-center justify-between mb-2'}>
          <div className={'flex items-center'}>
            <img
              className={'avatar-sm w-6 h-6 rounded-full mr-2'}
              src="https://picsum.photos/200"
            />
            <div className={'text-sm font-medium'}>{data?.user_id?.email}</div>
            <span className={'opacity-70 text-xs ml-2 -mb-0.5'}>
              Posted 16 days ago
            </span>
          </div>
          <Image
            src="/chains/ethereum.svg"
            alt="Ethereum"
            width="24"
            height="24"
            className={''}
          />
        </div>

        <h2 className={'text-lg font-semibold text-gray-900 mb-2'}>
          {data?.title}
        </h2>

        <div
          className={'text-sm opacity-70 mb-4'}
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
        <div className={'mt-auto flex items-center justify-between'}>
          <div className={'mt-auto flex items-center'}>
            <Image src="/symbols/usdt.svg" alt="USDT" width="20" height="20" />
            <strong className={'font-semibold ml-2'}>700 USDT</strong>
            <span className={'opacity-70 text-xs ml-2 -mb-0.5'}>~ $700</span>
          </div>

          <div className={'mt-auto flex items-center'}>
            <img
              className={'avatar-sm w-6 h-6 rounded-full -mr-1'}
              src="https://picsum.photos/200?random=1"
            />
            <img
              className={'avatar-sm w-6 h-6 rounded-full -mr-1'}
              src="https://picsum.photos/200?random=2"
            />
            <img
              className={'avatar-sm w-6 h-6 rounded-full -mr-1'}
              src="https://picsum.photos/200?random=3"
            />
            <div className={'bg-gray-200 rounded-full text-xs p-2 py-1'}>
              +56
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Job.propTypes = {
  classes: shape({
    root: string
  })
};
export default Job;
