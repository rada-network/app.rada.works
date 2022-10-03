import React, { Fragment } from 'react';
import { shape, string, number } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './rewards.module.css';
import { useStyle } from '../../../../classify';
import Coupon from './Coupon';
import Quest from './Quest';
import Questers from './Questers';
import HowClaim from './HowClaim';

const Rewards = (props) => {
  const { classes: propClasses, campaign } = props;
  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('campaign_details');

  const rewardOverview = campaign.reward_overview ? (
    <div className="bg-orange-50 border border-orange-200 shadow-sm rounded-lg mb-6">
      <div className="p-4">
        <div
          className={classes.rewardOverview}
          dangerouslySetInnerHTML={{ __html: campaign.reward_overview }}
        />
      </div>
    </div>
  ) : null;

  return (
    <Fragment>
      {rewardOverview}

      <Quest campaign={campaign} />

      <Questers campaign={campaign} />

      <HowClaim campaign={campaign} />

      <Coupon campaign={campaign} />
    </Fragment>
  );
};

Rewards.propTypes = {
  classes: shape({
    root: string
  }),
  campaign: shape({
    id: number
  })
};

export default Rewards;
