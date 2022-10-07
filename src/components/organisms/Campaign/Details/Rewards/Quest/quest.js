import React, { Fragment, useState } from 'react';
import { shape, string, object, func } from 'prop-types';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import defaultClasses from './quest.module.css';
import { useStyle } from '../../../../../classify';
import Button from '../../../../../atoms/Button';
import TextLink from '../../../../../../components/atoms/TextLink';
import { TwitterLogin } from '../../../../../../hooks/Campaign/Rewards/useTwitter';
import {
  TwitterIcon,
  TwitterAuthIcon,
  TaskFailIcon,
  TaskSuccessIcon
} from '../../../../Svg/SvgIcons';
import { useTwitterFollow } from '../../../../../../hooks/Campaign/Rewards';

const Quest = (props) => {
  const {
    classes: propClasses,
    tasks,
    setTasks,
    onClaimReward,
    verifyNftOwnership
  } = props;
  const classes = useStyle(defaultClasses, propClasses);
  const router = useRouter();
  const { t } = useTranslation('campaign_details');
  const { handleCheckTwitterFollow, handleCheckTwitterLogin } =
    useTwitterFollow({
      user_id: '805827086787035136',
      owner_id: '1574963666918600704'
    });
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [twitterVerifiedName, setTwitterVerifiedName] = useState(
    tasks.ck_twitter_login ? tasks.ck_twitter_login.screen_name : true
  );
  const [twitterFollowState, setTwitterFollowState] = useState(
    tasks.ck_twitter_follow ? tasks.ck_twitter_follow.status : true
  );
  const [twitterReTweetState, setTwitterReTweetState] = useState(
    tasks.ck_twitter_retweet ? tasks.ck_twitter_retweet.status : true
  );
  const [nftOwnershipState, setNftOwnershipState] = useState(
    tasks.ck_nft_ownership ? tasks.ck_nft_ownership.status : true
  );
  const isWalletConnected =
    !session || (session && session.user.email.includes('@')) ? false : true;

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
        {t('Login')}
      </Button>
    ) : (
      <span className={`ml-auto text-blue-600`}>@{twitterVerifiedName}</span>
    );
    twitterLoginTask = (
      <div className={classes.twitterLoginTask}>
        <span
          className={`${classes.taskIndex} ${
            tasks.ck_twitter_login.status ? classes.taskSuccess : ''
          }`}
        >
          {tasks.ck_twitter_login.id}
        </span>
        <div className="flex items-center flex-1">
          {TwitterIcon} {t('Login Twitter')} {twitterLoginStatus}
        </div>
      </div>
    );
  }
  const handleTwitterLogin = async () => {
    console.log('twitterLogin()');

    if (!isWalletConnected) {
      return toast.warning(
        t('You must connect your wallet before do this task!')
      );
    }

    await TwitterLogin({ reference_url: router.asPath });
    // do twitter login here...

    // assume that
    // const result = {
    //   status: true,
    //   screen_name: '@Qvv85'
    // };

    // // update state
    // tasks.ck_twitter_login.status = result.status;
    // tasks.ck_twitter_login.screen_name = result.screen_name;
    // //trigger to re-render
    // setTwitterVerifiedName(tasks.ck_twitter_login.screen_name);
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
        <span
          className={`${classes.taskIndex} ${
            tasks.ck_twitter_follow.status ? classes.taskSuccess : ''
          }`}
        >
          {tasks.ck_twitter_follow.id}
        </span>
        {t('Follow')}
        <TextLink
          target="_blank"
          title={t('Go to this Twitter channel.')}
          href={`https://twitter.com/${tasks.ck_twitter_follow.username}`}
        >
          <strong className="text-violet-600 hover:text-violet-700 font-bold">
            &nbsp;@{tasks.ck_twitter_follow.username}
          </strong>
          &nbsp;
        </TextLink>
        {t('on Twitter')}
        {twitterFollowStatus}
        {verifyTwitterFollowBtn}
      </div>
    );
  }
  // const handleCheckTwitterFollow = () => {
  //   console.log('handleCheckTwitterFollow()');

  //   if (!isWalletConnected) {
  //     return toast.warning(
  //       t('You must connect your wallet before do this task!')
  //     );
  //   }
  //   const data = TwitterFollow({ uid: 1, twitter_id: 2 });
  //   // checking twitter follow here...
  //   console.log('====================================');
  //   console.log(data);
  //   console.log('====================================');
  //   // assume that
  //   let result = {
  //     status: true
  //   };

  //   // update state
  //   tasks.ck_twitter_follow.status = result.status;
  //   //trigger to re-render
  //   setTwitterFollowState(tasks.ck_twitter_follow.status);
  // };

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
        <span
          className={`${classes.taskIndex} ${
            tasks.ck_twitter_retweet.status ? classes.taskSuccess : ''
          }`}
        >
          {tasks.ck_twitter_retweet.id}
        </span>
        {t('Must')}&nbsp;{t('Retweet')}&nbsp;
        <TextLink
          target="_blank"
          title={t('Open this tweet.')}
          href={`${tasks.ck_twitter_retweet.tweet_url}`}
          className="text-violet-600 hover:text-violet-700 font-bold"
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

    if (!isWalletConnected) {
      return toast.warning(
        t('You must connect your wallet before do this task!')
      );
    }

    // checking twitter re-tweet here...

    // assume that
    let result = {
      status: true
    };

    // update state
    tasks.ck_twitter_retweet.status = result.status;
    //trigger to re-render
    setTwitterReTweetState(tasks.ck_twitter_retweet.status);
  };

  const verifyNftOwnershipBtn = !nftOwnershipState ? (
    <Button
      id={`btn-verify-nft-ownership`}
      priority="high"
      classes={{ root_highPriority: classes.btnVerifyTwitter }}
      type="button"
      onPress={() => handleCheckNftOwnership()}
    >
      {t('Verify')}
    </Button>
  ) : null;
  const nftOwnershipStatus = (
    <span className={`ml-auto`}>
      {nftOwnershipState === true
        ? TaskSuccessIcon
        : nftOwnershipState === false
        ? TaskFailIcon
        : ''}
    </span>
  );
  const nftOwnershipTask = tasks.ck_nft_ownership ? (
    <div className={classes.soulBoundTokenTask}>
      <span
        className={`${classes.taskIndex} ${
          tasks.ck_nft_ownership.status ? classes.taskSuccess : ''
        }`}
      >
        {tasks.ck_nft_ownership.id}
      </span>
      <div className="flex-1 flex">
        <div>
          <h4 className="mt-0 mb-0 leading-normal text-md font-bold text-gray-800">
            <span className={classes.bsc} />
            {t('SoulBound Token Ownership')}
          </h4>
          <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
            {t('Must hold Binance Account Bound Token in wallet.')}{' '}
          </p>
        </div>

        <div className="">
          {/*{tasks.ck_nft_ownership.nftCollectionInfo}*/}
          {nftOwnershipStatus}
          {verifyNftOwnershipBtn}
        </div>
      </div>
    </div>
  ) : null;
  const handleCheckNftOwnership = async () => {
    console.log('handleCheckNftOwnership()');

    if (!isWalletConnected) {
      return toast.warning(
        t('You must connect your wallet before do this task!')
      );
    }

    // verify NFT ownership here...
    let result = await verifyNftOwnership();
    console.log('ckOwnership Result:', result);
    result = true; //coming soon
    // update state
    tasks.ck_nft_ownership.status = result;
    //trigger to re-render
    setNftOwnershipState(tasks.ck_nft_ownership.status);
  };

  const isFinishedTasks =
    !twitterVerifiedName ||
    !twitterFollowState ||
    !twitterReTweetState ||
    !nftOwnershipState
      ? false
      : true;
  const btnClaimReward = (
    <div className={`${classes.btnClaimRewardWrap}`}>
      <Button
        id={`btn-claim-reward`}
        priority="high"
        classes={{
          root_highPriority:
            isWalletConnected && isFinishedTasks
              ? classes.btnClaimReward
              : classes.btnClaimRewardDisabled
        }}
        type="button"
        onPress={
          isWalletConnected && isFinishedTasks ? () => onClaimReward() : null
        }
      >
        {t('Submit')}
      </Button>
    </div>
  );

  const child = Object.keys(tasks).length ? (
    <Fragment>
      <div className="py-3 px-4">
        <h3 className="mt-0 mb-1 leading-normal text-xl lg:text-2xl font-bold text-gray-800 tracking-tight">
          {t('Require tasks')}
        </h3>
        <p className="text-sm text-gray-600 font-normal mt-0 mb-0">
          {t('Complete all task below to be eligible.')}
        </p>
      </div>

      <div className="p-4">
        {twitterLoginTask}
        {twitterFollowTask}
        {twitterReTweetTask}
        {nftOwnershipTask}
        {btnClaimReward}
      </div>
    </Fragment>
  ) : null;

  return <div className={`${classes.root}`}>{child}</div>;
};

Quest.propTypes = {
  classes: shape({
    root: string
  }),
  tasks: object,
  setTasks: func,
  verifyNftOwnership: func,
  onClaimReward: func
};

export default Quest;
