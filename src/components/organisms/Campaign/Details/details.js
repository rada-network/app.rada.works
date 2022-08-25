import React from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { useDetails } from '../../../../hooks/Campaign';
import classes from './detail.module.css';

const Details = (props) => {
  const { slug } = props;

  const { t } = useTranslation('campaign_details');

  const { theme } = useTheme();
  const rootClassName = theme === 'dark' ? 'rootDark' : 'root';

  const { loading, data, error } = useDetails({
    slug: { _eq: slug } ?? ''
  });

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
    if (data.campaign) {
      const campaign = data.campaign[0];
      console.log(campaign);
      child = (
        <div>
          <h1 className={classes.title}>{campaign.title}</h1>
          <p
            className={classes.desc}
            dangerouslySetInnerHTML={{ __html: campaign.description }}
          />
          Other...
        </div>
      );
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
