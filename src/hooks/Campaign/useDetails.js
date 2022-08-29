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

  const handleViewCoupons = useCallback(async () => {
    console.log('View coupon codes clicked...');
  }, []);

  return {
    loading,
    data,
    error,
    handleViewCoupons
  };
};
