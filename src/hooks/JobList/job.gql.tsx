import { gql } from '@apollo/client';

export const LOAD_JOB_BY_SLUG = gql`
  query LoadJobBySlug($slug: String!) {
    job(slug: $slug) {
      id
      title
      short_desc
      price
      visual_style
      description
      status
      duration
      date_started
      date_ends
      user_created
    }
  }
`;
