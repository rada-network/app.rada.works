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

    console.log('verifyNFTOwnership:', response.result);

    return response.result.length ? true : false;
  };

  const handleViewCoupons = useCallback(async (props) => {
    // verify nft ownership
    const { chainName, contractAdd, accountAdd, isCampaignOwner } = props;
    let rs = null;

    //Checking via Moralis APIs: https://docs.moralis.io/reference/getnftsforcontract
    const isNFTOwnership = await verifyNFTOwnership(
      chainName,
      contractAdd,
      accountAdd
    );

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
