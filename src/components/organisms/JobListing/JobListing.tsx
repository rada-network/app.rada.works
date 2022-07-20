import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import classes from './JobListing.module.css';
import myData from './sampleData.json';
const JobListing = (props) => {
  const { job } = props;
  const Heading = () => (
    <Fragment>
      <h2 className={classes.heading}>Featured Contests</h2>
      <div>
        Cras convallis tempus ex nec euismod. Proin pretium metus mauris, ut
        vulputate sem suscipit et. Vivamus sodales egestas lectus vel tempor.
        Quisque laoreet, ipsum vitae volutpat.
      </div>
    </Fragment>
  );
  const JobList = Array.from(myData, (data, key) => {
    return (
      <Fragment key={key}>
        <div className={`${classes.jobListing}`}>
          <div className={classes.jobListing__author}>{data['author']}</div>
          <h2 className={classes.jobListing__title}>{data['title']}</h2>
          <div className={classes.jobListing__desc}>{data['description']}</div>
        </div>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <section className={classes.section}>
        <div className="container mx-auto">
          <Heading />
          <div> Job listing </div>
          {JobList}
        </div>
      </section>
    </Fragment>
  );
};
JobListing.defaultProps = {
  job: myData
};
JobListing.propTypes = {
  classes: shape({
    root: string
  })
};

export default JobListing;
