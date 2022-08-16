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
    $visual_style: JSON #        $attachments: [create_job_files_input]
  ) {
    create_job_item(
      data: {
        title: $title
        slug: $slug
        short_desc: $short_desc
        duration: $duration
        price: $price
        description: $description
        visual_style: $visual_style
        #                attachments: $attachments
        status: "pending"
        is_featured: false
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
        price: $price
        visual_style: $visual_style
      }
    ) {
      id
      title
    }
  }
`;
export const SAVE_JOB_FILES = gql`
  mutation SaveJobFiles($id: ID!, $attachments: [update_job_files_input]) {
    update_job_item(id: $id, data: { attachments: $attachments }) {
      id
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
          #                    filename_disk
          filename_download
          #                    title
          #                    type
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

export const IMPORT_FILE = gql`
  mutation ImportJobFile(
    $url: String!
    $data: create_directus_files_input! #https://docs.directus.io/reference/files.html#the-file-object
  ) {
    import_file(url: $url, data: $data) {
      id
      storage
      filename_download
      uploaded_on
      modified_on
    }
  }
`;
export const importFileFunc = async (props) => {
  const { url, data } = props;
  const client = initializeApollo();
  return await client.mutate({
    mutation: IMPORT_FILE,
    variables: { url, data }
  });
};

export const DELETE_FILE = gql`
  mutation DeleteFile($fileId: ID!) {
    delete_files_item(id: $fileId) {
      id
    }
  }
`;
export const deleteFileFunc = async (fileId) => {
  const client = initializeApollo();
  return await client.mutate({
    mutation: DELETE_FILE,
    variables: { fileId }
  });
};

export default {
  loadBackendFieldFunc,
  createJobMutation: SUBMIT_CREATE_JOB_FORM,
  loadJobByIdQuery: LOAD_JOB_BY_ID,
  editJobMutation: SUBMIT_EDIT_JOB_FORM,
  importFileFunc,
  deleteFileFunc,
  saveJobFilesMutation: SAVE_JOB_FILES
};
