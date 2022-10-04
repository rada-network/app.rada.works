import { useCallback, useState } from 'react';
import TextLink from '../../../components/atoms/TextLink';
import { ellipsify } from '../../../utils/strUtils';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';

export default (props) => {
  const { campaign, classes } = props;

  const { t } = useTranslation('campaign_details');

  const { data: session } = useSession();

  const requiredTasks = [];
  if (campaign.twitter_tweet || campaign.twitter_username) {
    requiredTasks.push({
      name: 'ck_twitter_login',
      status: false,
      msg: null
    });
  }
  if (campaign.twitter_username) {
    requiredTasks.push({
      name: 'ck_twitter_follow',
      username: campaign.twitter_username,
      status: false,
      msg: null
    });
  }
  if (campaign.twitter_tweet) {
    requiredTasks.push({
      name: 'ck_twitter_retweet',
      tweet_url: campaign.twitter_tweet,
      status: false,
      msg: null
    });
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
    requiredTasks.push({
      name: 'ck_nft_ownership',
      nftCollectionInfo,
      status: false,
      msg: null
    });
  }

  const [tasks, setTasks] = useState(requiredTasks);

  const isFinishedRequiredTasks = () => {
    return !tasks.some((task) => task.status === false);
  };

  const handleClaimReward = useCallback(() => {
    console.log('claimReward()');

    //check connect wallet
    if (!session || (session && session.user.email.includes('@'))) {
      return toast.warning(
        t('You must collect your wallet before claiming rewards!')
      );
    }

    //Check required tasks
    if (tasks.length) {
      if (!isFinishedRequiredTasks()) {
        return toast.warning(t('You must finish all required tasks!'));
      } else {
        // If all required tasks done
      }
    }
  }, [campaign]);

  return {
    tasks,
    setTasks,
    handleClaimReward
  };
};