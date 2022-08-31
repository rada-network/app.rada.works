import { useQuery } from '@apollo/client';
import API from './list.api.gql';

export default (props) => {
  const { position } = props;

  let filter = {
    status: { _eq: 'published' }
  };

  // if (position === 'search-coupon-page') {
  // } else {
  // }

  const { getCampaigns } = API;
  const { data, loading, error } = useQuery(getCampaigns, {
    variables: {
      filter,
      limit: 9,
      sort: ['-date_created']
    }
  });

  return { loading, data, error };
};
