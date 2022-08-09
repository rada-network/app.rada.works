import { gql } from '@apollo/client';

export const LOAD_JOB_BY_ID = gql`
  query LoadJobById($id: ID!) {
    job_by_id(id: $id) {
      id
      title
      short_desc
      price
      visual_style
      description
      status
      duration
      date_created
      user_created {
        id
        email
      }
    }
  }
`;
