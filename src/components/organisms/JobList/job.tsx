import React, { Fragment, FunctionComponent } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import slugify from 'slugify';
interface JobProps {
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
}
const Job: FunctionComponent<JobProps> = (props) => {
  const { data } = props;
  const handleClick = () => {
    const path = `/job-details/${slugify(data.title).toLowerCase()}`;
    Router.push(path);
  };
  return (
    <Fragment key={data.id}>
      <div
        className={
          'border border-gray-200 dark:border-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow flex flex-col items-stretch'
        }
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

        <h2
          className={
            'text-lg font-semibold text-gray-900 dark:text-gray-400 dark:hover:text-white mb-2 cursor-pointer'
          }
          onClick={handleClick}
        >
          {data?.title}
        </h2>

        <div
          className={'text-sm opacity-70 mb-4'}
          dangerouslySetInnerHTML={{ __html: data?.short_desc }}
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
            <div
              className={
                'bg-gray-200 dark:bg-gray-800 rounded-full text-xs p-2 py-1'
              }
            >
              +56
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Job;
