import { useState } from 'react';
import { useQuery } from '@apollo/client';
import API from './details.api.gql';
import { useCallback } from 'react';

export default (props) => {
  const { slug } = props;

  const { getCampaign } = API;

  const { data, loading, error } = useQuery(getCampaign, {
    fetchPolicy: 'no-cache',
    skip: !slug,
    variables: {
      slug
    }
  });

  const getBSCTokenTx = (contractAdd, accountAdd) => {
    let rs = null;
    if (contractAdd && accountAdd) {
      const BSC_API_KEY = process.env.BSC_API_KEY;
      const API_ENDPOINT_URL = process.env.BSC_API_ENDPOINT;
      let URL = `${API_ENDPOINT_URL}?module=account&action=tokentx`;
      URL += `&contractaddress=${contractAdd}&&address=${accountAdd}`;
      URL += `&page=1&offset=5&startblock=0&endblock=999999999&sort=asc`;
      URL += `&apikey=${BSC_API_KEY}`;

      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          rs = data.result;
        });
    }

    return rs;
  };

  const handleViewCoupons = useCallback(async (props) => {
    console.log('View coupon codes clicked...');
    const { chainName, contractAdd, accountAdd } = props;

    let transaction = null;
    if (chainName === 'bsc') {
      transaction = getBSCTokenTx(contractAdd, accountAdd);
    }

    console.log(transaction);
  }, []);

  return {
    loading,
    data,
    error,
    handleViewCoupons
  };
};
