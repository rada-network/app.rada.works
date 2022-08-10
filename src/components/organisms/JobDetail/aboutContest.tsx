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
      <div className={classes.root}>
        <div className={classes.heading}>
          <h3>About Contest</h3>
        </div>
        <div className={classes.content}>
          <div className={classes.owner}>
            <div className={classes.address}>
              <span>Owner</span>
              <span>{subString({ str: address })}</span>
            </div>
            <div className={classes.avatar}>
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
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
