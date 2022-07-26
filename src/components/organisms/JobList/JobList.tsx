import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import Job from './job';
import classes from './jobList.module.css';
import myData from './sampleData.json';
const JobList = (props) => {
  const { page } = props;
  const diffDays = (date, otherDate) => {
    Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
  };

  const Heading = (props) => {
    const { page } = props;
    return (
      <Fragment key={page}>
        {page === 'joblist' ? (
          <>
            <h2 className={classes.heading}>Browse Jobs</h2>
          </>
        ) : (
          <>
            <h2 className={classes.heading}>Browse Jobs</h2>
            <p className={'opacity-50'}>
              Complete with other contributors and win prizes!
            </p>
          </>
        )}
      </Fragment>
    );
  };
  const JobList = Array.from(myData, (data, Itemkey) => {
    return <Job key={Itemkey} itemId={Itemkey} data={data} />;
  });

  return (
    <Fragment>
      <section className={classes.section}>
        <div className="container mx-auto">
          <Heading page={page} />
          <div className={classes.itemlist}>{JobList}</div>
        </div>
      </section>
    </Fragment>
  );
};
JobList.defaultProps = {
  job: myData
};
JobList.propTypes = {
  classes: shape({
    root: string
  })
};

export default JobList;
