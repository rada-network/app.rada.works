import React, { Fragment } from 'react';
import { shape, string, number } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './rewards.module.css';
import { useStyle } from '../../../../classify';
import Coupon from './Coupon';
import Quest from './Quest';
import Questers from './Questers';
import HowClaim from './HowClaim';
import Button from '../../../../atoms/Button';

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

  const claimReward = () => {
    console.log('claimReward()');
  };
  const btnClaimReward = (
    <div className="py-4 px-4">
      <Button
        id={`btn-claim-reward`}
        priority="high"
        classes={{ root_highPriority: classes.btnClaimReward }}
        type="button"
        onPress={() => claimReward()}
      >
        {t('Claim Reward')}
      </Button>
    </div>
  );

  return (
    <Fragment>
      {rewardOverview}

      <HowClaim campaign={campaign} />

      <Quest campaign={campaign} />

      <Coupon campaign={campaign} />

      {btnClaimReward}

      <Questers campaign={campaign} />
    </Fragment>
  );
};

Rewards.propTypes = {
  classes: shape({
    root: string
  }),
  campaign: shape({
    id: string
  })
};

export default Rewards;
