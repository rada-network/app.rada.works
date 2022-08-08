import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import classes from './jobList.module.css';
import { useJobList } from '../../../hooks/JobList';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { Heading } from 'src/components/atoms/Heading';
import Job from './job';

const JobList = (props: { page: string }) => {
  const { t } = useTranslation('jobList');
  const { page } = props;
  const { loading, data, error } = useJobList({
    page,
    slug: '',
    operations: ''
  });
  return '';
  if (loading) {
    return <div>{t('Loading...')}</div>;
  } else if (error) {
    toast.error(t('Error'));
  } else {
    const jobs = data?.job;
    const JobList = jobs?.map(
      (
        job: {
          id: number;
          user_id: { email: string };
          description: string;
          owner_id: string;
          short_desc: string;
          title: string;
          status: string;
          date_updated: string;
          is_featured: boolean;
        },
        index: React.Key | null | undefined
      ) => {
        return <Job key={index} data={job} />;
      }
    );
    const subheading =
      page === 'homepage'
        ? t(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dignissim enim ut est suscipit, ut euismod lacus tincidunt. Nunc feugiat ex id mi hendrerit, et efficitur ligula bibendum.'
          )
        : '';
    return (
      <Fragment>
        <section className={classes.root}>
          <div className="container mx-auto">
            <Heading
              classes={{ heading: classes.heading }}
              subHeading={`${subheading}`}
              HeadingType="h1"
            >
              {t('🎉 Browse Jobs')}
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
