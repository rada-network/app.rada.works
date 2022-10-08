import { useCallback, useEffect, useState } from 'react';
import TextLink from '../../../components/atoms/TextLink';
import { ellipsify } from '../../../utils/strUtils';
import { EvmChain } from '@moralisweb3/evm-utils';
import Moralis from 'moralis';
import { getSession, useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import API from './api.gql';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  saveSocialLink,
  checkExistsSocialLink
} from 'src/hooks/User/useSocial';
import BrowserPersistence from '../../../utils/simplePersistence';
import { getTwitterId } from 'src/libs/useFunc';
import { getTwitterUserIdByUsermame } from './useTwitter';
import { Client } from 'twitter-api-sdk';
const twitterClient = new Client(process.env.TWITTER_BEARER_TOKEN);
export default (props) => {
  const { campaign, classes } = props;

  const { isQuesterExistsFunc, createQuester } = API;

  const { t } = useTranslation('campaign_details');

  const { data: session } = useSession();

  const storage = new BrowserPersistence();

  const requiredTasks = {};
  let finishedTasks = storage.getItem('finishedTasks');
  requiredTasks.wallet = {
    id: 1
  };
  if (campaign.twitter_tweet || campaign.twitter_username) {
    requiredTasks.ck_twitter_login = {
      id: 2,
      status: finishedTasks ? finishedTasks.ck_twitter_login.status : null,
      screen_name: finishedTasks
        ? finishedTasks.ck_twitter_login.screen_name
        : null,
      msg: null
    };

    let socialLink = null;
    const router = useRouter();
    if (router.query.user) {
      const { user, name, uid } = router.query;
      // Checking and saving to social link
      getSession().then(async () => {
        //check exits and saving to social link
        const found = await checkExistsSocialLink(
          { _eq: 'twitter' },
          { _eq: `${uid}` }
        );
        if (!found) {
          socialLink = await saveSocialLink({
            name: 'twitter',
            username: user,
            uid
          });
        } else {
          socialLink = found;
        }
        if (socialLink && socialLink.uid) {
          requiredTasks.ck_twitter_login.status = true;
          requiredTasks.ck_twitter_login.screen_name = socialLink.username;
          //saving to local storage for other contexts
          storage.setItem('twSocialLink', socialLink, 24 * 60 * 60); //1 days
        }
        // Refresh page
        socialLink && router.push('/campaign-details/' + router.query.slug[0]);
      });
    } else {
      //check local storage
      socialLink = storage.getItem('twSocialLink');
      if (socialLink && socialLink.uid) {
        requiredTasks.ck_twitter_login.status = true;
        requiredTasks.ck_twitter_login.screen_name = socialLink.username;
      }
    }
  }

  if (campaign.twitter_username) {
    const TwitterOwnersId = useCallback(async () => {
      const TwitterId = await getTwitterUserIdByUsermame({
        user_id: campaign.twitter_username
      });
      return TwitterId;
    }, [campaign.twitter_username]);
    requiredTasks.ck_twitter_follow = {
      id: 3,
      twOwnerId: TwitterOwnersId,
      username: campaign.twitter_username,
      status: finishedTasks ? finishedTasks.ck_twitter_follow.status : null,
      msg: null
    };
  }
  if (campaign.twitter_tweet) {
    requiredTasks.ck_twitter_retweet = {
      id: 4,
      tweet_url: campaign.twitter_tweet,
      status: finishedTasks ? finishedTasks.ck_twitter_retweet.status : null,
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
      id: 5,
      nftCollectionInfo,
      status: finishedTasks ? finishedTasks.ck_nft_ownership.status : null,
      msg: null
    };
  }
  const [tasks, setTasks] = useState(requiredTasks);

  const isFinishedTasks = () => {
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
  };

  // Checking via Moralis APIs: https://docs.moralis.io/reference/getnftsforcontract
  const verifyNFTOwnership = async (chainName, tokenAddress, address) => {
    if (!address.includes('0x')) {
      return false;
    }

    let chain = null;
    if (chainName === 'bsc') {
      chain = EvmChain.BSC;
    }
    if (chainName === 'bsc_testnet') {
      chain = EvmChain.BSC_TESTNET;
    } else if (chainName === 'ethereum') {
      chain = EvmChain.ETHEREUM;
    } else if (chainName === 'polygon') {
      chain = EvmChain.POLYGON;
    }
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY
      // ...and any other configuration
    });
    const response = await Moralis.EvmApi.account.getNFTsForContract({
      address,
      tokenAddress,
      chain
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log('verifyNFTOwnership:', response.result);
    }

    return response.result.length ? true : false;
  };

  const handleVerifyNftOwnership = useCallback(async () => {
    const isCampaignOwner =
      session && session.id === campaign.user_created.id ? true : false;
    let isNFTOwnership = isCampaignOwner ? true : false;
    const nftCollections = campaign.nft_collection_ids;
    const accountAdd = session && session.user ? session.user.email : null;
    if (accountAdd && accountAdd.includes('0x') && nftCollections.length) {
      for (let i = 0; i < nftCollections.length; i++) {
        const nftCollection = nftCollections[i].nft_collection_id;
        const chainName = nftCollection.chain_name;
        const contractAdd = nftCollection.contract_address;
        if (contractAdd && contractAdd.toLowerCase() !== 'n/a') {
          isNFTOwnership = await verifyNFTOwnership(
            chainName,
            contractAdd,
            accountAdd
          );
          if (isNFTOwnership) break;
        }
      }
    }

    return isNFTOwnership;
  }, [campaign]);

  const [
    saveQuester,
    {
      data: saveQuestResult,
      error: saveQuesterError,
      loading: saveQuesterLoading
    }
  ] = useMutation(createQuester, {
    fetchPolicy: 'no-cache'
  });

  const handleClaimReward = useCallback(async () => {
    console.log('claimReward()');

    //Check required tasks
    if (!isFinishedTasks()) {
      return toast.warning(t('You must finish all required tasks!'));
    } else {
      try {
        // All require tasks done
        // 1. Check was joined
        //const userEmail = session?.user?.email;
        const userEmail = session && session.user ? session.user.email : null;
        if (userEmail) {
          const found = await isQuesterExistsFunc(
            { _eq: campaign.id },
            { email: { _eq: userEmail } }
          );
          if (!found) {
            // 2. Save if has not join yet
            await saveQuester({
              variables: {
                campaign_id: campaign.id,
                status: 'approved'
              }
            });
          } else {
            return toast.warning(t('You have submitted!'));
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
        return;
      }
    }
  }, [campaign]);

  // Handle saving quest result
  useEffect(() => {
    if (saveQuestResult) {
      //storage.setItem('finishedTasks', finishedTasks, 24*60*60);
      return toast.success(t('Submitted successfully!'));
    }
    if (saveQuesterError) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(saveQuesterError);
      }
      return toast.error(t('Something went wrong. Please try again!'));
    }
  }, [saveQuestResult, saveQuesterError]);

  return {
    tasks,
    setTasks,
    handleClaimReward,
    handleVerifyNftOwnership,
    saveQuesterLoading,
    saveQuestResult
  };
};
