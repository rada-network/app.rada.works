import { gql } from '@apollo/client';

export const LOAD_JOB_BY_SLUG = gql`
  query LoadJobBySlug($slug: string_filter_operators!) {
    job(filter: { slug: $slug }) {
      id
      slug
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
