import { gql } from '@apollo/client';

export const GET_JOBS = gql`
  query getJobs($filter: job_filter) {
    job(filter: $filter) {
      id
      title
      description
      date_created
    }
  }
`;

export default {
  getJobs: GET_JOBS
};
