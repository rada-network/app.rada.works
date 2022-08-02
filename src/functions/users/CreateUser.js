import { gql } from '@apollo/client';
import { initializeApollo } from '../../../src/libs/SystemApolloClient.js';

export const CREATE_USER_GQL = gql`
  mutation create_users_item($data: create_directus_users_input!) {
    create_users_item(data: $data) {
      email
    }
  }
`;

export const createUser = async (data) => {
  const client = initializeApollo();
  try {
    const res = await client.mutate({
      mutation: CREATE_USER_GQL,
      variables: { data }
    });
    return res;
  } catch (error) {
    return error;
  }
};
