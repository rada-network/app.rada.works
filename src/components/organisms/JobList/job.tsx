import React, { Fragment } from 'react';
import { shape, string, number, object } from 'prop-types';
import classes from './JobList.module.css';

const Job = (props) => {
  const { itemId, data } = props;
  return (
    <Fragment key={itemId}>
      <div className={classes.item}>
        <div className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-white dark:text-slate-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 p-5">
          <div className={classes.author}>{data['user_id']['email']}</div>
          <h2 className={classes.title}>{data['title']}</h2>
          <div
            className={classes.desc}
            dangerouslySetInnerHTML={{ __html: data['description'] }}
          />
        </div>
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
