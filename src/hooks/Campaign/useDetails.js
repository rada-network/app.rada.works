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

  const handleViewCoupons = useCallback(async (props) => {
    console.log('handleViewCoupons()');
    console.log('props:', props);

    // verify nft ownership
    const { chainName, contractAdd, accountAdd } = props;
    let rs = null;
    let txData = [];
    if (chainName === 'bsc') {
      txData = await getBSCTokenNftTx(contractAdd, accountAdd);
    }
    // else if (chainName === 'ethereum') {
    //
    // } else if (chainName === 'polygon') {
    //
    // }

    if (txData.length) {
      //request to get and return coupon codes:
      // const { data, loading, error } = await useQuery(getCouponCodes, {
      //   fetchPolicy: 'no-cache',
      //   skip: !slug,
      //   variables: {
      //     slug
      //   }
      // });
      // console.log(data);
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
