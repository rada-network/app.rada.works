import React, { Fragment } from 'react';
import { shape, string, number, object } from 'prop-types';
import classes from './JobList.module.css';

const Job = (props: any) => {
  const { itemId, data } = props;
  return (
    <Fragment key={itemId}>
      <div className={classes.item}>
        <div className={classes.item_inner}>
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
