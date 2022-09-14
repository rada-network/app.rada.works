import { initializeApollo } from '../../libs/SystemApolloClient.js';
import {
  USER_EXISTS_GQL,
  LOGIN_GQL,
  AUTH_REFRESH_GQL,
  UPDATE_USER_GQL,
  CREATE_USER_GQL
} from './api.gql';

export const authLogin = async (auth: any) => {
  const { email, password } = auth;
  const client = initializeApollo();
  const { data } = await client.mutate({
    mutation: LOGIN_GQL,
    variables: { email, password }
  });
  return data;
};

export const authRefresh = async (auth: any) => {
  const { refresh_token } = auth;
  const client = initializeApollo();
  const { data } = await client.mutate({
    mutation: AUTH_REFRESH_GQL,
    variables: { refresh_token }
  });
  return data;
};
export const isExistsUser = async (email: string) => {
  let checkUsser = { id: '', email: '' };
  const client = initializeApollo();
  const { data } = await client.query({
    query: USER_EXISTS_GQL,
    variables: { email: { _eq: email } }
  });
  if (data.users.length > 0) {
    checkUsser = data.users[0];
  }
  return checkUsser;
};

export const createUser = async (data: any) => {
  const client = initializeApollo();
  try {
    const res = await client.mutate({
      mutation: CREATE_USER_GQL,
      variables: { data }
    });
    return res.data.create_users_item;
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

function parseJwt(token: string) {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
}

export const getTokenState = (token: any) => {
  if (!token) {
    return { valid: false, needRefresh: true };
  }
  const decoded = parseJwt(token);
  if (!decoded) {
    return { valid: false, needRefresh: true };
  } else if (decoded.exp && Math.floor(Date.now() / 1000) + 300 > decoded.exp) {
    return { valid: false, needRefresh: true };
  } else {
    return { valid: true, needRefresh: false };
  }
};
export const getRefreshToken = async (data: any) => {
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
