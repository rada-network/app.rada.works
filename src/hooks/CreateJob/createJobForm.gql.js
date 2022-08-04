import { gql } from '@apollo/client';

export const SUBMIT_CREATE_JOB_FORM = gql`
  mutation SubmitCreateJobForm(
    $title: String!
    $slug: String!
    $short_desc: String!
    $description: String!
    $duration: Int!
    $price: Float!
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
      description
      status
      duration
    }
  }
`;

export default {
  createJobMutation: SUBMIT_CREATE_JOB_FORM,
  editJobMutation: SUBMIT_EDIT_JOB_FORM,
  loadJobByIdQuery: LOAD_JOB_BY_ID
};
