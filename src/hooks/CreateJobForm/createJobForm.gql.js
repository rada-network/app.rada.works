import { gql } from '@apollo/client';

export const SUBMIT_JOB_FORM = gql`
  mutation SubmitCreateJobForm(
    $title: String!
    $short_desc: String!
    $description: String!
  ) {
    createJob(
      data: {
        title: $title
        short_desc: $short_desc
        description: $description
      }
    ) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;
export default {
  createJobMutation: SUBMIT_JOB_FORM
};
