import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './rewards.module.css';
import { useStyle } from '../../../../classify';
import Coupon from './Coupon';
import Quest from './Quest';
import Questers from './Questers';
import HowClaim from './HowClaim';
import Button from '../../../../atoms/Button';
import { useRewards } from '../../../../../hooks/Campaign/Rewards';

const Rewards = (props) => {
  const { classes: propClasses, campaign } = props;
  const classes = useStyle(defaultClasses, propClasses);
  const { t } = useTranslation('campaign_details');

  const { tasks, setTasks, handleClaimReward } = useRewards({
    campaign,
    classes
  });

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

      <HowClaim campaign={campaign} />

      <Quest
        tasks={tasks}
        setTasks={setTasks}
        onClaimReward={handleClaimReward}
      />

      <Coupon campaign={campaign} />

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
