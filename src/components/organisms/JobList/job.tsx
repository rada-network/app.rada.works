import React, { Fragment } from 'react';
import { shape, string, number, object } from 'prop-types';
import classes from './jobList.module.css';

const Job = (props) => {
  const { itemId, data } = props;
  return (
    <Fragment key={itemId}>
      <div
        className={
          'border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-shadow'
        }
      >
        <div className={'flex items-center'}>
          <img
            className={'avatar-sm w-6 h-6 rounded-full mr-2'}
            src="https://picsum.photos/200"
          />
          <div className={'text-sm font-medium'}>
            {data['user_id']['email']}
          </div>
        </div>
        <h2 className={'text-lg font-semibold'}>{data['title']}</h2>
        <div
          className={'text-sm opacity-70'}
          dangerouslySetInnerHTML={{ __html: data['description'] }}
        />
      </div>
    </Fragment>
  );
};

Job.propTypes = {
  classes: shape({
    root: string
  }),
  itemId: number,
  data: object
};
export default Job;
