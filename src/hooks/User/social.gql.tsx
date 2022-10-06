import { gql } from '@apollo/client';

export const CREATE_SOCIAL_LINK_GQL = gql`
  mutation create_social_link_item($data: create_social_link_input!) {
    create_social_link_item(data: $data) {
      id
      name
      username
    }
  }
`;

export const GET_SOCIAL_LINK_GQL = gql`
  query get_social($user_created: directus_users_filter) {
    social_link(filter: { user_created: $user_created }) {
      name
      username
    }
  }
`;

export const GET_SOCIAL_LINK_GQL2 = gql`
  query social_link($username: string_filter_operators) {
    social_link(filter: { username: $username }) {
      name
      username
    }
  }
`;

export const UPDATE_SOCIAL_LINK_GQL = gql`
  mutation update_social_link_item($id: ID!, $data: update_social_link_input!) {
    update_social_link_item(id: $id, data: $data) {
      name
      username
    }
  }
`;

export default {
  CREATE_SOCIAL_LINK_GQL,
  UPDATE_SOCIAL_LINK_GQL,
  GET_SOCIAL_LINK_GQL
};
