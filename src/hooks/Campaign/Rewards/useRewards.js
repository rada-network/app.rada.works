import { useCallback, useState } from 'react';
import TextLink from '../../../components/atoms/TextLink';
import { ellipsify } from '../../../utils/strUtils';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'next-i18next';

export default (props) => {
  const { campaign, classes } = props;

  // const { t } = useTranslation('campaign_details');

  const requiredTasks = {};
  if (campaign.twitter_tweet || campaign.twitter_username) {
    requiredTasks.ck_twitter_login = {
      id: 1,
      status: false,
      msg: null
    };
  }
  if (campaign.twitter_username) {
    requiredTasks.ck_twitter_follow = {
      id: 2,
      username: campaign.twitter_username,
      status: false,
      msg: null
    };
  }
  if (campaign.twitter_tweet) {
    requiredTasks.ck_twitter_retweet = {
      id: 3,
      tweet_url: campaign.twitter_tweet,
      status: false,
      msg: null
    };
  }
  if (campaign.nft_collection_ids.length) {
    // Build NFT collection information
    const nftCollectionInfo =
      campaign &&
      campaign.nft_collection_ids &&
      campaign.nft_collection_ids.length
        ? campaign.nft_collection_ids.map((nftCollection, index) => (
            <div key={index} className={`${classes.nftCollectionWrap}`}>
              <span
                className={`${classes.chain} ${
                  classes[nftCollection.nft_collection_id.chain_name]
                }`}
              >
                {nftCollection.nft_collection_id.chain_name}
              </span>
              <TextLink
                className={classes.nftCollectionLink}
                href={`/nft-collection-details/${nftCollection.nft_collection_id.slug}`}
              >
                <span className={`${classes.collectionName}`}>
                  {nftCollection.nft_collection_id.name}
                </span>{' '}
                <span className={classes.contractAdd}>
                  (
                  {ellipsify({
                    str: nftCollection.nft_collection_id.contract_address,
                    start: 6,
                    end: 4
                  })}
                  )
                </span>{' '}
              </TextLink>
            </div>
          ))
        : null;
    requiredTasks.ck_nft_ownership = {
      id: 4,
      nftCollectionInfo,
      status: false,
      msg: null
    };
  }
  const [tasks, setTasks] = useState(requiredTasks);

  /*const isFinishedTasks = () => {
    let rs = true;
    const keys = Object.keys(tasks);
    if (keys.length) {
      for (let i = 0; i < keys.length; i++) {
        if (tasks[keys[i]] && tasks[keys[i]].status === false) {
          rs = false;
          break;
        }
      }
    }

    return rs;
  };*/

  const handleClaimReward = useCallback(() => {
    console.log('claimReward()');

    //Check connect wallet
    /*if (!session || (session && session.user.email.includes('@'))) {
      return toast.warning(
        t('You must connect your wallet before claiming rewards!')
      );
    }*/

    //Check required tasks
    /*if (!isFinishedTasks()) {
      return toast.warning(t('You must finish all required tasks!'));
    } else {
      // If all required tasks done
    }*/
  }, [campaign]);

  return {
    tasks,
    setTasks,
    handleClaimReward
  };
};
