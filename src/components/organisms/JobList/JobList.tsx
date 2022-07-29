import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import Job from './job';
import classes from './JobList.module.css';
import { useJobList } from '../../../hooks/JobList';
import myData from './sampleData.json';
const JobList = (props: { page: string }) => {
  const { page } = props;
  let filter = {};
  if (page === 'joblist') {
    filter = {
      id: { _gt: 0 }
    };
  } else {
    filter = {
      is_featured: { _eq: true }
      // title: { _eq: 'asd' }
    };
  }

  const { loading, data, error } = useJobList({
    filter,
    operations: ''
  });
  console.log('data:', data, 'error:', error);
  // const diffDays = (date: number, otherDate: number) => {
  //   Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
  // };

  const Heading = (props: { page: string }) => {
    const { page } = props;
    return (
      <Fragment key={page}>
        {page === 'joblist' ? (
          <>
            <h2 className={classes.heading}>🎉 Browse Jobs</h2>
          </>
        ) : (
          <>
            <h2 className={classes.heading}>🎉 Browse Jobs</h2>
            <p className={'opacity-70 text-center mt-2'}>
              Complete with other contributors and win prizes!
            </p>
          </>
        )}
      </Fragment>
    );
  };
  const JobList = Array.from(myData, (data, Itemkey) => {
    if (typeof data.is_featured === 'undefined') data.is_featured = false;
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
