import React, { Fragment } from 'react';
import { subString } from 'src/libs/useFunc';
import classes from './aboutContest.module.css';

const AbountContest = (props: {
  data: {
    address: string;
    avatar: string;
    date_started: string;
    date_ends: string;
  };
}) => {
  const { data } = props;
  const { address, avatar, date_started, date_ends } = data;
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.heading}>
          <h3>About Contest</h3>
        </div>
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
      </div>
    </Fragment>
  );
};
export default AbountContest;
