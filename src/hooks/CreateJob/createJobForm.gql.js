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
    $attachments: [update_job_files_input]
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
        attachments: $attachments
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
      attachments {
        id
        # See more: https://docs.directus.io/reference/files.html#the-file-object
        directus_files_id {
          id
          filename_disk
          filename_download
          title
          type
        }
      }
      description
      status
      duration
    }
  }
`;

export const LOAD_BACKEND_FIELD = gql`
  query LoadBackendField($collection: String!, $field: String!) {
    fields_by_name(collection: $collection, field: $field) {
      meta {
        options
      }
    }
  }
`;
export const loadBackendFieldFunc = async (collection, field) => {
  const client = initializeApollo();
  try {
    return await client.query({
      query: LOAD_BACKEND_FIELD,
      variables: { collection, field },
      nextFetchPolicy: 'cache-first'
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return error;
  }
};

export const IMPORT_JOB_FILE = gql`
  mutation ImportJobFile(
    $url: String!
    $data: create_directus_files_input! #https://docs.directus.io/reference/files.html#the-file-object
  ) {
    import_file(url: $url, data: $data) {
      id
    }
  }
`;
export const importFileFunc = async (props) => {
  const { url, data } = props;
  const client = initializeApollo();
  return await client.mutate({
    mutation: IMPORT_JOB_FILE,
    variables: { url, data }
  });
};

export default {
  loadBackendFieldFunc,
  importFileFunc,
  createJobMutation: SUBMIT_CREATE_JOB_FORM,
  editJobMutation: SUBMIT_EDIT_JOB_FORM,
  loadJobByIdQuery: LOAD_JOB_BY_ID
};
