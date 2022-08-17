import React, { Fragment } from 'react';
import { subString } from 'src/libs/useFunc';
import classes from './aboutContest.module.css';

export const AboutContest = (props: {
  data: {
    address: string | undefined;
    avatar: string | undefined;
    date_created: string | undefined;
    date_ends: string | undefined;
  };
}) => {
  const { data } = props;
  const { address, avatar, date_created, date_ends } = data;
  return (
    <Fragment>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700 py-3 px-6">
          <h3 className="text-lg text-gray-600 dark:text-white font-medium my-0">
            About Contest
          </h3>
        </div>
        <div className={classes.content}>
          <div className={classes.owner}>
            <div className={classes.address}>
              <span>Owner: </span>
              <span>{subString({ str: address })}</span>
            </div>
            <div className={classes.avatar}>
              <img
                className={'avatar-sm w-12 h-12 rounded-full mr-2'}
                src={avatar ? avatar : 'https://picsum.photos/200'}
              />
            </div>
          </div>
          <div>
            <div>start date: {date_created}</div>
            <div>end date: {date_ends}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
