import { gql } from '@apollo/client';

export const SUBMIT_CREATE_JOB_FORM = gql`
  mutation SubmitCreateJobForm(
    $title: String!
    $slug: String!
    $shortDesc: String!
    $description: String!
    $deliveryDate: Date!
    $price: Float!
    $status: String!
    $isFeatured: Boolean!
  ) {
    create_job_item(
      data: {
        title: $title
        slug: $slug
        short_desc: $shortDesc
        price: $price
        description: $description
        status: $status
        is_featured: $isFeatured
        date_delivery: $deliveryDate
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
    $shortDesc: String!
    $price: Float!
    $description: String!
    $status: String!
    $deliveryDate: Date!
  ) {
    update_job_item(
      id: $id
      data: {
        title: $title
        slug: $slug
        short_desc: $shortDesc
        description: $description
        status: $status
        price: $price
        date_delivery: $deliveryDate
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
      date_delivery
    }
  }
`;

export default {
  createJobMutation: SUBMIT_CREATE_JOB_FORM,
  editJobMutation: SUBMIT_EDIT_JOB_FORM,
  loadJobByIdQuery: LOAD_JOB_BY_ID
};
