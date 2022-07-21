import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import Job from './job';
import classes from './JobList.module.css';
import myData from './sampleData.json';
const JobList = (props) => {
  const { job } = props;
  const diffDays = (date, otherDate) =>
    Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

  // Example
  const test = diffDays(new Date('2014-12-19'), new Date('2020-01-01')); // 1839
  console.log(test);
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
  const JobList = Array.from(myData, (item, key) => {
    return <Job itemkey={key} data={item} />;
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
JobList.defaultProps = {
  job: myData
};
JobList.propTypes = {
  classes: shape({
    root: string
  })
};

export default JobList;
