import { gql } from '@apollo/client';

export const LOAD_CAMPAIGN_BY_SLUG = gql`
  query LoadCampainBySlug($slug: string_filter_operators!) {
    campaign(filter: { slug: $slug }) {
      id
      slug
      title
      description
      nft_collection_id
      discount_value
      store_url
    }
  }
`;

export default {
  getCampaign: LOAD_CAMPAIGN_BY_SLUG
};
