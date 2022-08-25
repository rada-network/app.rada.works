import { useQuery } from '@apollo/client';
import API from './list.api.gql';

export default (props) => {
  const { page } = props;

  let filter = {
    status: { _eq: 'published' }
  };

  // if (page === 'search-coupon') {
  // } else {
  // }

  const { getCampaigns } = API;
  const { data, loading, error } = useQuery(getCampaigns, {
    variables: {
      filter,
      limit: 10,
      sort: ['-date_created']
    }
  });

  return { loading, data, error };
};
