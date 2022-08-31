import { gql } from '@apollo/client';

export const CREATE_USER_GQL = gql`
  mutation create_users_item($data: create_directus_users_input!) {
    create_users_item(data: $data) {
      id
      email
    }
  }
`;

export const UPDATE_USER_GQL = gql`
  mutation create_users_item($data: create_directus_users_input!) {
    create_users_item(data: $data) {
      email
    }
  }
`;

export const LOGIN_GQL = gql`
  mutation auth_login($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const AUTH_REFRESH_GQL = gql`
  mutation auth_refresh($refresh_token: String!) {
    auth_refresh(refresh_token: $refresh_token) {
      access_token
      refresh_token
    }
  }
`;
export const USER_EXISTS_GQL = gql`
  query users_item($email: string_filter_operators!) {
    users(filter: { email: $email }) {
      id
      email
    }
  }
`;
export default {
  CREATE_USER_GQL,
  UPDATE_USER_GQL,
  LOGIN_GQL,
  AUTH_REFRESH_GQL,
  USER_EXISTS_GQL
};
