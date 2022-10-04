import { useCallback, useState } from 'react';
import TextLink from '../../../components/atoms/TextLink';
import { ellipsify } from '../../../utils/strUtils';

export default (props) => {
  const { campaign, classes } = props;

  const requiredTasks = null;
  if (campaign.twitter_tweet || campaign.twitter_username) {
    requiredTasks['twitter_login'] = {
      name: 'ck_twitter_login',
      status: false,
      msg: null
    };
  }
  if (campaign.twitter_username) {
    requiredTasks['twitter_follow'] = {
      name: 'ck_twitter_follow',
      username: campaign.twitter_username,
      status: false,
      msg: null
    };
  }
  if (campaign.twitter_tweet) {
    requiredTasks['twitter_retweet'] = {
      name: 'ck_twitter_retweet',
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
    requiredTasks['nft_ownership'] = {
      name: 'ck_nft_ownership',
      nftCollectionInfo,
      status: false,
      msg: null
    };
  }

  const [tasks, setTasks] = useState(requiredTasks);

  const handleClaimReward = useCallback(() => {
    console.log('claimReward()');
    console.log(campaign.reward_overview);
  }, [campaign]);

  console.log(tasks);
  return {
    tasks,
    setTasks,
    handleClaimReward
  };
};
