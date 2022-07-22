import { gql } from '@apollo/client';

export const SUBMIT_JOB_FORM = gql`
  mutation SubmitCreateJobForm(
    $title: String!
    $short_desc: String!
    $description: String!
    $status: String!
  ) {
    create_job_item(
      data: {
        title: $title
        short_desc: $short_desc
        description: $description
        status: $status
      }
    ) {
      id
      title
      status
    }
  }
`;
export default {
  createJobMutation: SUBMIT_JOB_FORM
};
