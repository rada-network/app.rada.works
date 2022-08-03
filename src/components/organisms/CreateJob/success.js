import React, { Fragment } from 'react';
import Router from 'next/router';
import { shape, string } from 'prop-types';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import defaultClasses from './success.module.css';
import { useStyle } from '../../classify';
import Button from '../../atoms/Button';
import slugify from 'slugify';

const Success = (props) => {
  const { classes: propClasses, jobId, jobTitle } = props;
  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('common');

  const { status } = useSession();

  const editJob = () => {
    Router.push(`/edit-job/${jobId}`);
  };

  const viewJob = () => {
    Router.push(`/job-details/${slugify(jobTitle).toLowerCase()}`);
  };

  const child =
    status === 'authenticated' ? (
      <div className={`${classes.root}`}>
        <h1> {t('Done')} </h1>
        <div className={`${classes.note}`}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </div>
        <div className={`${classes.actions}`}>
          <Button
            priority="low"
            type="button"
            className={classes.btnEdit}
            onClick={() => editJob()}
          >
            {t('Edit Job')}
          </Button>
          <Button
            priority="high"
            type="button"
            className={classes.btnView}
            onClick={() => viewJob()}
          >
            {t('View Job')}
          </Button>
        </div>
      </div>
    ) : null;

  return <Fragment>{child}</Fragment>;
};

Success.propTypes = {
  classes: shape({
    root: string
  }),
  jobId: string.isRequired,
  jobTitle: string.isRequired
};

export default Success;
