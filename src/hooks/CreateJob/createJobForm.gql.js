import { gql } from '@apollo/client';

export const SUBMIT_CREATE_JOB_FORM = gql`
  mutation SubmitCreateJobForm(
    $title: String!
    $slug: String!
    $shortDesc: String!
    $description: String!
    $status: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    create_job_item(
      data: {
        title: $title
        slug: $slug
        short_desc: $shortDesc
        description: $description
        status: $status
        date_started: $startDate
        date_ends: $endDate
      }
    ) {
      id
    }
  }
`;

export const SUBMIT_EDIT_JOB_FORM = gql`
  mutation SubmitEditJobForm(
    $id: ID!
    $title: String!
    $slug: String!
    $shortDesc: String!
    $description: String!
    $status: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    update_job_item(
      id: $id
      data: {
        title: $title
        slug: $slug
        short_desc: $shortDesc
        description: $description
        status: $status
        date_started: $startDate
        date_ends: $endDate
      }
    ) {
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
      description
      status
      date_started
      date_ends
    }
  }
`;

export default {
  createJobMutation: SUBMIT_CREATE_JOB_FORM,
  editJobMutation: SUBMIT_EDIT_JOB_FORM,
  loadJobByIdQuery: LOAD_JOB_BY_ID
};
