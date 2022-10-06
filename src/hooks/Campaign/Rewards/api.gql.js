import { gql } from '@apollo/client';
import { initializeApollo } from '../../../libs/apolloClient';

export const CREATE_QUESTER = gql`
  mutation CreateQuester($campaign_id: String, $status: String) {
    create_quester_item(data: { campaign_id: $campaign_id, status: $status }) {
      id
    }
  }
`;

export const IS_QUESTER_EXISTS = gql`
  query IsQuesterExist(
    $campaign_id: string_filter_operators!
    $user_created: directus_users_filter!
  ) {
    quester(
      filter: { campaign_id: $campaign_id, user_created: $user_created }
    ) {
      id
    }
  }
`;
export const isQuesterExists = async (campaign_id, user_created) => {
  let rs = null;
  const client = initializeApollo();
  try {
    const { data } = await client.query({
      query: IS_QUESTER_EXISTS,
      variables: { campaign_id, user_created },
      fetchPolicy: 'no-cache'
    });
    if (data.quester && data.quester[0]) {
      rs = data.quester[0].id;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return error;
  }

  return rs;
};

export default {
  createQuester: CREATE_QUESTER,
  isQuesterExistsFunc: isQuesterExists
};
