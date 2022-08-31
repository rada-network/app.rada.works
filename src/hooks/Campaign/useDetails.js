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

  const getBSCTokenNftTx = (contractAdd, accountAdd) => {
    console.log('getBSCTokenNftTx()');
    console.log(contractAdd, accountAdd);

    let rs = null;
    if (contractAdd && accountAdd) {
      //https://docs.bscscan.com/api-endpoints/accounts#get-a-list-of-bep-721-token-transfer-events-by-address
      //@todo: move to env
      const BSC_API_KEY = 'SFH36BJT75CQXC6JB25NRK1H5HPA2JC5NR';
      const API_ENDPOINT_URL = 'https://api-testnet.bscscan.com/api';

      let URL = `${API_ENDPOINT_URL}?module=account&action=tokentx`;
      URL += `&contractaddress=${contractAdd}&&address=${accountAdd}`;
      URL += `&page=1&offset=5&startblock=0&endblock=999999999&sort=asc`;
      URL += `&apikey=${BSC_API_KEY}`;
      rs = fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          return data.result;
        });
    }

    return rs;
  };

  const verifyNFTOwnership = async (chainName, tokenAddress, address) => {
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

    //Checking from explorer channel
    // let txData = [];
    // if (chainName === 'bsc') {
    //   txData = await getBSCTokenNftTx(contractAdd, accountAdd);
    // }
    // else if (chainName === 'ethereum') {
    //
    // } else if (chainName === 'polygon') {
    //
    // }

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
