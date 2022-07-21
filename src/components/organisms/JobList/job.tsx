import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import classes from './JobList.module.css';

const Job = (props: any) => {
  const { itemkey, data } = props;
  return (
    <Fragment key={itemkey}>
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
  title: string,
  description: string,
  user_id: string
};
Job.propTypes = {
  classes: shape({
    root: string
  })
};
export default Job;
