import { gql } from '@apollo/client';
import { initializeApollo } from '../../../src/libs/SystemApolloClient.js';

export const LOGIN_GQL = gql`
  mutation auth_login($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const authLogin = async (auth) => {
  const { email, password } = auth;
  const client = initializeApollo();
  const { data } = await client.mutate({
    mutation: LOGIN_GQL,
    variables: { email, password }
  });
  return data;
};
