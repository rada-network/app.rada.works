import { gql } from '@apollo/client';

export const SUBMIT_JOB_FORM = gql`
  mutation SubmitCreateJobForm(
    $title: String!
    $shortDesc: String!
    $description: String!
    $status: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    create_job_item(
      data: {
        title: $title
        short_desc: $shortDesc
        description: $description
        status: $status
        date_started: $startDate
        date_ends: $endDate
      }
    ) {
      id
      status
    }
  }
`;
export default {
  createJobMutation: SUBMIT_JOB_FORM
};
