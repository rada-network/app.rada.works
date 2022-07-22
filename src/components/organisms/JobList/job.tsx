import React, { Fragment } from 'react';
import { shape, string, number, object } from 'prop-types';
import classes from './JobList.module.css';

const Job = (props: any) => {
  const { key, data } = props;
  console.log(key);
  return (
    <Fragment key={key}>
      <div className={classes.jobList}>
        <div className={classes.author}>{data['user_id']['email']}</div>
        <h2 className={classes.title}>{data['title']}</h2>
        <div
          className={classes.desc}
          dangerouslySetInnerHTML={{ __html: data['description'] }}
        />
      </div>
    </Fragment>
  );
};
Job.defaultProps = {
  key: number,
  data: object
};
Job.propTypes = {
  classes: shape({
    root: string
  })
};
export default Job;
