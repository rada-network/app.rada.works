import React, { Fragment, useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import classes from './JobList.module.css';
import { useJobList } from '../../../hooks/JobList';
import myData from './sampleData.json';
import Job from './job';

const JobList = (props: { page: string }) => {
  const { page } = props;
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [jobLists, setJobLists] = useState<any>();
  const { loading, data, error } = useJobList({
    page,
    slug: '',
    operations: ''
  });
  // useEffect(() => {
  //   const useJobLists = () => {
  //     const { loading, data, error } = useJobList({
  //       page,
  //       slug: '',
  //       operations: ''
  //     });
  //     if (loading) {
  //       setLoading(true);
  //     } else if (error) {
  //       setError(true);
  //     } else {
  //       setJobLists(data);
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useJobLists();
  // }, [jobLists, page]);
  console.log('data:', data, 'error:', isError);
  // const diffDays = (date: number, otherDate: number) => {
  //   Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
  // };
  if (loading) {
    return <div>Loading...</div>;
  } else {
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
  }
};

JobList.propTypes = {
  classes: shape({
    root: string
  })
};

export default JobList;
