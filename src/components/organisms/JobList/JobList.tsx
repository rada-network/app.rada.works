import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import classes from './JobList.module.css';
import { useJobList } from '../../../hooks/JobList';
import { Heading } from 'src/components/atoms/Heading';
import myData from './sampleData.json';
import Job from './job';

const JobList = (props: { page: string }) => {
  const { page } = props;
  const { loading, data, error } = useJobList({
    page,
    slug: '',
    operations: ''
  });
  console.log('data:', data, 'error:', error);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const JobList = Array.from(myData, (data, Itemkey) => {
      if (typeof data.is_featured === 'undefined') data.is_featured = false;
      return <Job key={Itemkey} itemId={Itemkey} data={data} />;
    });

    return (
      <Fragment>
        <section className={classes.section}>
          <div className="container mx-auto">
            {/* eslint-disable-next-line prettier/prettier */}
            <Heading headingCls={classes.heading} subHeading={``} HeadingType="h1">
              🎉 Browse Jobs
            </Heading>
            <div className={classes.itemlist}>{JobList}</div>
          </div>
        </section>
      </Fragment>
    );
  }
};

JobList.propTypes = {
  classes: shape({
    root: string
  })
};

export default JobList;
