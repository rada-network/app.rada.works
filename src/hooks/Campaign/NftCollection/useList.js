import { useQuery } from '@apollo/client';
import API from './list.api.gql';

export default (props) => {
  let filter = {
    status: { _eq: 'published' }
  };
  let limit = 18;

  const { getNftCollections } = API;
  const { data, loading, error } = useQuery(getNftCollections, {
    variables: {
      filter,
      limit,
      sort: ['-date_created']
    }
  });

  return { loading, data, error };
};
