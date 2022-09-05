import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './related.module.css';
import { useStyle } from '../../../classify';
import { useList } from '../../../../hooks/Campaign';
import Item from './item';

const Related = (props) => {
  const { currentCampaign, classes: propClasses } = props;

  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('common');

  const { loading, data, error } = useList({
    position: 'related',
    currentCampaign
  });

  let blockHeading = (
    <h3 className={classes.boxTitle}>{t('Other campaigns')}</h3>
  );

  let child = null;
  if (!data) {
    if (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      child = t('Something went wrong.');
    } else if (loading) {
      child = <div>{t('Loading...')}</div>;
    }
  } else {
    if (data.campaign && !data.campaign.length) {
      child = (
        <div className={classes.noResult}>{t('No related campaigns.')}</div>
      );
    } else {
      const relatedItems = data.campaign.map((campaign) => (
        <Item key={campaign.id} data={campaign} />
      ));
      child = <ul className={classes.couponList}>{relatedItems}</ul>;
    }
  }
  return (
    <Fragment>
      <div className={classes.Box}>
        {blockHeading}
        <div className={classes.boxBody}>{child}</div>
      </div>
    </Fragment>
  );
};

Related.propTypes = {
  classes: shape({
    root: string
  }),
  currentCampaign: shape({
    id: string,
    title: string
  })
};

export default Related;
