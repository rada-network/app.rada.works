import React, { Fragment } from 'react';
import { shape, string, array, func } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './quest.module.css';
import { useStyle } from '../../../../../classify';
import Button from '../../../../../atoms/Button';
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

  const twitterLoginTask = tasks['twitter_login'] ? (
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

  const twitterFollowTask = tasks['twitter_follow'] ? (
    <div className={classes.twitterFollowTask}>
      {t('Follow ')}
      <strong className="text-blue-600 font-semibold">
        @{tasks['twitter_follow'].username}
      </strong>{' '}
      on Twitter
      <span className={`ml-auto`}> {TaskFailIcon} </span>
      {/*<small className="-mt-2 mb-3 block text-red-600 text-xs">
            Please try again...
          </small>*/}
    </div>
  ) : null;

  const reTweetTask = tasks['twitter_retweet'] ? (
    <div className={classes.twitterRetweetTask}>
      Must&nbsp;<strong>Retweet</strong>&nbsp; this tweet
      <span className={`ml-auto`}>{TaskSuccessIcon}</span>
    </div>
  ) : null;

  const nftOwnershipTask = tasks['nftOwnership'] ? (
    <div className={classes.nftOwnershipTask}>
      <h4 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
        {t('NFT Ownership')}
      </h4>
      <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
        {t(
          'You must be holder of one NFT in the one of the following NFT collections'
        )}
      </p>
      <div className="p-4"> {tasks['nftOwnership'].nftCollectionInfo} </div>
    </div>
  ) : null;

  const child = tasks ? (
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
        {twitterLoginTask}

        {twitterFollowTask}

        {reTweetTask}

        {nftOwnershipTask}
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
