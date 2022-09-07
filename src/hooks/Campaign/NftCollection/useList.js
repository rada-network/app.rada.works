import { useQuery } from '@apollo/client';
import API from './list.api.gql';

export default (props) => {
  let filter = {
    status: { _eq: 'published' }
  };
  let limit = 12;

  // if (position === 'home-page') {
  //   limit = 6;
  // } else if (position === 'related') {
  //   filter.id = { _neq: parseInt(currentCampaign.id) };
  //   filter.nft_collection_id = {
  //     id: { _eq: parseInt(currentCampaign.nft_collection_id.id) }
  //   };
  //   limit = 5;
  // }

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
