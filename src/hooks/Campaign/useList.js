import { useQuery } from '@apollo/client';
import API from './list.api.gql';

export default (props) => {
  const { position, currentCampaign = null } = props;

  let filter = {
    status: { _eq: 'published' }
  };
  let limit = 10;

  if (position === 'related') {
    filter.id = { _neq: parseInt(currentCampaign.id) };
    limit = 5;
  }

  const { getCampaigns } = API;
  const { data, loading, error } = useQuery(getCampaigns, {
    variables: {
      filter,
      limit,
      sort: ['-date_created']
    }
  });

  return { loading, data, error };
};
