import React, { Fragment, useState } from 'react';
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

  const [twitterVerifiedName, setTwitterVerifiedName] = useState(null);
  const [twitterFollowState, setTwitterFollowState] = useState(null);
  const [twitterReTweetState, setTwitterReTweetState] = useState(null);

  let twitterLoginTask = null;
  if (tasks.ck_twitter_login) {
    const twitterLoginStatus = !tasks.ck_twitter_login.status ? (
      <Button
        id={`btn-twitter-login`}
        priority="high"
        classes={{ root_highPriority: classes.btnTwitterLogin }}
        type="button"
        onPress={() => handleTwitterLogin()}
      >
        {TwitterAuthIcon} {t('Login')}
      </Button>
    ) : (
      <span className={`ml-auto text-blue-600`}>{twitterVerifiedName}</span>
    );
    twitterLoginTask = (
      <div className={classes.twitterLoginTask}>
        {TwitterIcon} {t('Twitter')} {twitterLoginStatus}
      </div>
    );
  }
  const handleTwitterLogin = () => {
    console.log('twitterLogin()');
    // do twitter login here...

    // assume that
    let result = {
      status: true,
      screen_name: '@Qvv85'
    };

    // update state
    tasks.ck_twitter_login.status = result.status;
    tasks.ck_twitter_login.screen_name = result.screen_name;
    //trigger to re-render
    setTwitterVerifiedName(tasks.ck_twitter_login.screen_name);
  };

  let twitterFollowTask = null;
  if (tasks.ck_twitter_follow) {
    const verifyTwitterFollowBtn = !twitterFollowState ? (
      <Button
        id={`btn-verify-twitter-follow`}
        priority="high"
        classes={{ root_highPriority: classes.btnVerifyTwitter }}
        type="button"
        onPress={() => handleCheckTwitterFollow()}
      >
        {t('Verify')}
      </Button>
    ) : null;
    const twitterFollowStatus = (
      <span className={`ml-auto`}>
        {twitterFollowState === true
          ? TaskSuccessIcon
          : twitterFollowState === false
          ? TaskFailIcon
          : ''}
      </span>
    );
    twitterFollowTask = (
      <div className={classes.twitterFollowTask}>
        {t('Follow')}
        <strong className="text-blue-600 font-semibold">
          &nbsp; @{tasks.ck_twitter_follow.username}
        </strong>
        &nbsp;
        {t('on Twitter')}
        {twitterFollowStatus}
        {verifyTwitterFollowBtn}
      </div>
    );
  }
  const handleCheckTwitterFollow = () => {
    console.log('handleCheckTwitterFollow()');
    // checking twitter follow here...

    // assume that
    let result = {
      status: true
    };

    // update state
    tasks.ck_twitter_follow.status = result.status;
    //trigger to re-render
    setTwitterFollowState(tasks.ck_twitter_follow.status);
  };

  let twitterReTweetTask = null;
  if (tasks.ck_twitter_retweet) {
    const verifyTwitterReTweetBtn = !twitterReTweetState ? (
      <Button
        id={`btn-verify-twitter-re-tweet`}
        priority="high"
        classes={{ root_highPriority: classes.btnVerifyTwitter }}
        type="button"
        onPress={() => handleCheckTwitterReTweet()}
      >
        {t('Verify')}
      </Button>
    ) : null;
    const twitterReTweetStatus = (
      <span className={`ml-auto`}>
        {twitterReTweetState === true
          ? TaskSuccessIcon
          : twitterReTweetState === false
          ? TaskFailIcon
          : ''}
      </span>
    );
    twitterReTweetTask = (
      <div className={classes.twitterRetweetTask}>
        {t('Must')}&nbsp;<strong>{t('Retweet')}</strong>&nbsp;
        <TextLink
          target="_blank"
          href={`${tasks.ck_twitter_retweet.tweet_url}`}
        >
          {t('this tweet')}
        </TextLink>
        {twitterReTweetStatus}
        {verifyTwitterReTweetBtn}
      </div>
    );
  }
  const handleCheckTwitterReTweet = () => {
    console.log('handleCheckTwitterReTweet()');
    // checking twitter re-tweet here...

    // assume that
    let result = {
      status: false
    };

    // update state
    tasks.ck_twitter_retweet.status = result.status;
    //trigger to re-render
    setTwitterReTweetState(tasks.ck_twitter_retweet.status);
  };

  const nftOwnershipTask = tasks.ck_nft_ownership ? (
    <div className={classes.nftOwnershipTask}>
      <h4 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
        {t('NFT Ownership')}
      </h4>
      <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
        {t(
          'You must be holder of one NFT in the one of the following NFT collections'
        )}
      </p>
      <div className="p-4"> {tasks.ck_nft_ownership.nftCollectionInfo} </div>
    </div>
  ) : null;

  const child = Object.keys(tasks).length ? (
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
        {twitterReTweetTask}
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
