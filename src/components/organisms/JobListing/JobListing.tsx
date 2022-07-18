import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import classes from './JobListing.module.css';

const JobListing = (props: { job: any }) => {
  const { job } = props;
  const data = job ? job.data : { title: 'hahaha', desc: 'hahaha' };
  console.log(job);
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
  return (
    <Fragment>
      <section className={classes.section}>
        <div className="container mx-auto">
          <Heading />
          <div> Job listing </div>
        </div>
      </section>
    </Fragment>
  );
};
JobListing.propDefs = {
  job: shape({
    title: string,
    desc: string
  })
};
JobListing.propTypes = {
  classes: shape({
    root: string
  })
};

export default JobListing;
