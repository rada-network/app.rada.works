import { gql } from '@apollo/client';
import { initializeApollo } from '../../../src/libs/SystemApolloClient.js';

export const SUBMIT_CREATE_JOB_FORM = gql`
  mutation SubmitCreateJobForm(
    $title: String!
    $slug: String!
    $short_desc: String!
    $description: String!
    $duration: Int!
    $price: Float!
    $visual_style: JSON
    $status: String!
    $is_featured: Boolean!
  ) {
    create_job_item(
      data: {
        title: $title
        slug: $slug
        short_desc: $short_desc
        duration: $duration
        price: $price
        visual_style: $visual_style
        description: $description
        status: $status
        is_featured: $is_featured
      }
    ) {
      id
      title
    }
  }
`;

export const SUBMIT_EDIT_JOB_FORM = gql`
  mutation SubmitEditJobForm(
    $id: ID!
    $title: String!
    $slug: String!
    $short_desc: String!
    $price: Float!
    $visual_style: JSON
    $description: String!
    $status: String!
    $duration: Int!
  ) {
    update_job_item(
      id: $id
      data: {
        title: $title
        slug: $slug
        short_desc: $short_desc
        duration: $duration
        description: $description
        status: $status
        price: $price
        visual_style: $visual_style
      }
    ) {
      id
      title
    }
  }
`;

export const LOAD_JOB_BY_ID = gql`
  query LoadJobById($id: ID!) {
    job_by_id(id: $id) {
      id
      title
      short_desc
      price
      visual_style
      description
      status
      duration
    }
  }
`;

export const LOAD_BACKEND_FIELD = gql`
  query LoadBackendField($collection: String!, $field: String!) {
    fields_by_name(collection: $collection, field: $field) {
      #            field
      meta {
        options
      }
    }
  }
`;
export const loadBackendFieldFunc = async (collection, field) => {
  const client = initializeApollo();
  try {
    let result = await client.query({
      query: LOAD_BACKEND_FIELD,
      variables: { collection, field },
      nextFetchPolicy: 'cache-first'
    });

    return result;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return error;
  }
};

export default {
  loadBackendFieldFunc,
  createJobMutation: SUBMIT_CREATE_JOB_FORM,
  editJobMutation: SUBMIT_EDIT_JOB_FORM,
  loadJobByIdQuery: LOAD_JOB_BY_ID
};
