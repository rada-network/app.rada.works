import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import { useQuery } from '@apollo/client';
import API from './details.api.gql';
import { useCallback } from 'react';

export default (props) => {
  const { slug } = props;

  const { getCampaign, getCouponCodes } = API;

  const { data, loading, error } = useQuery(getCampaign, {
    fetchPolicy: 'no-cache',
    skip: !slug,
    variables: {
      slug
    }
  });

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

  const handleViewCoupons = useCallback(async (props) => {
    // verify nft ownership
    const { nftCollections, accountAdd, isCampaignOwner } = props;

    let rs = null;
    let isNFTOwnership = false;
    if (nftCollections.length) {
      for (let i = 0; i < nftCollections.length; i++) {
        const nftCollection = nftCollections[i].nft_collection_id;
        const chainName = nftCollection.chain_name;
        const contractAdd = nftCollection.contract_address;
        isNFTOwnership = await verifyNFTOwnership(
          chainName,
          contractAdd,
          accountAdd
        );
        if (isNFTOwnership) break;
      }
    }

    if (isNFTOwnership || isCampaignOwner) {
      rs = await getCouponCodes(slug);
    } else {
      rs = 'You have not permission to view coupon codes!';
    }

    return rs;
  }, []);

  return {
    loading,
    data,
    error,
    handleViewCoupons
  };
};
