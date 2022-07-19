import { gql } from '@apollo/client';

export const SUBMIT_JOB_FORM = gql`
  mutation SubmitCreateJobForm(
    $title: String!
    $short_desc: String!
    $description: String!
  ) {
    createJob(
      input: {
        title: $name
        short_desc: $short_desc
        description: $description
      }
    ) {
      status
    }
  }
`;
export default {
  createJobMutation: SUBMIT_JOB_FORM
};
