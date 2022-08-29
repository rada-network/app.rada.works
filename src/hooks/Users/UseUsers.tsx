import { initializeApollo } from '../../../src/libs/SystemApolloClient.js';
import {
  USER_EXISTS_GQL,
  LOGIN_GQL,
  UPDATE_USER_GQL,
  CREATE_USER_GQL
} from './users.gql';

export const authLogin = async (auth: any) => {
  const { email, password } = auth;
  const client = initializeApollo();
  console.log('====================================');
  console.log(LOGIN_GQL);
  console.log('====================================');
  const { data } = await client.mutate({
    mutation: LOGIN_GQL,
    variables: { email, password }
  });
  return data;
};
export const UserExists = async (auth: any) => {
  const { email } = auth;
  const client = initializeApollo();
  const { data } = await client.query({
    query: USER_EXISTS_GQL,
    variables: { email: { _eq: email } }
  });
  return data;
};

export const createUser = async (data: any) => {
  const client = initializeApollo();
  try {
    const res = await client.mutate({
      mutation: CREATE_USER_GQL,
      variables: { data }
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUser = async (data: any) => {
  const client = initializeApollo();
  try {
    const res = await client.mutate({
      mutation: UPDATE_USER_GQL,
      variables: { data }
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
