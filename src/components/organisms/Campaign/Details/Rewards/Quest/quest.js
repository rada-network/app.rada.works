import React, { Fragment } from 'react';
import { shape, string, array, func } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './quest.module.css';
import { useStyle } from '../../../../../classify';
import Button from '../../../../../atoms/Button';
import TextLink from '../../../../../../components/atoms/TextLink';
import {
  TwitterIcon,
  TwitterAuthIcon,
  TaskFailIcon,
  TaskSuccessIcon
} from '../../../../Svg/SvgIcons';

const Quest = (props) => {
  const { classes: propClasses, tasks, setTasks } = props;
  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('campaign_details');

  const getTask = (taskName) => {
    const rs = tasks.filter((task) => task.name === taskName);
    return rs ? rs[0] : null;
  };

  const twitterLoginTask = getTask('ck_twitter_login');
  const twitterLoginTaskHtml = twitterLoginTask ? (
    <div className={classes.twitterLoginTask}>
      {TwitterIcon} {t('Twitter')}
      <Button
        id={`btn-twitter-login`}
        priority="high"
        classes={{ root_highPriority: classes.btnTwitterLogin }}
        type="button"
        onPress={() => handleTwitterLogin()}
      >
        {TwitterAuthIcon} {t('Login')}
      </Button>
    </div>
  ) : null;

  const handleTwitterLogin = () => {
    console.log('twitterLogin()...');
  };

  const twitterFollowTask = getTask('ck_twitter_follow');
  const twitterFollowTaskHtml = twitterFollowTask ? (
    <div className={classes.twitterFollowTask}>
      {t('Follow')}
      <strong className="text-blue-600 font-semibold">
        &nbsp; @{twitterFollowTask.username}
      </strong>
      &nbsp;
      {t('on Twitter')}
      {/*<span className={`ml-auto`}> {TaskFailIcon} </span>*/}
      {/*<small className="-mt-2 mb-3 block text-red-600 text-xs">
            Please try again...
          </small>*/}
    </div>
  ) : null;

  const reTweetTask = getTask('ck_twitter_retweet');
  const reTweetTaskHtml = reTweetTask ? (
    <div className={classes.twitterRetweetTask}>
      {t('Must')}&nbsp;<strong>{t('Retweet')}</strong>&nbsp;
      <TextLink target="_blank" href={`${reTweetTask.tweet_url}`}>
        {t('this tweet')}
      </TextLink>
      {/*<span className={`ml-auto`}>{TaskSuccessIcon}</span>*/}
    </div>
  ) : null;

  const nftOwnershipTask = getTask('ck_nft_ownership');
  const nftOwnershipTaskHtml = nftOwnershipTask ? (
    <div className={classes.nftOwnershipTask}>
      <h4 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
        {t('NFT Ownership')}
      </h4>
      <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
        {t(
          'You must be holder of one NFT in the one of the following NFT collections'
        )}
      </p>
      <div className="p-4"> {nftOwnershipTask.nftCollectionInfo} </div>
    </div>
  ) : null;

  const child = tasks.length ? (
    <Fragment>
      <div className="border-b border-gray-200 border-opacity-60 py-3 px-4">
        <h3 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
          {t('Require Tasks')}
        </h3>
        {/*<p className="text-sm text-gray-500 font-normal mt-0 mb-0">
            Follow the steps below to add yourself to this list.
          </p>*/}
      </div>

      <div className="p-4">
        {twitterLoginTaskHtml}
        {twitterFollowTaskHtml}
        {reTweetTaskHtml}
        {nftOwnershipTaskHtml}
      </div>
    </Fragment>
  ) : null;

  return <div className={`${classes.root}`}>{child}</div>;
};

Quest.propTypes = {
  classes: shape({
    root: string
  }),
  tasks: array,
  setTasks: func
};

export default Quest;
