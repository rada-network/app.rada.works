import { gql } from '@apollo/client';

export const LOAD_CAMPAIGN_BY_SLUG = gql`
  query LoadCampainBySlug($slug: string_filter_operators!) {
    campaign(filter: { slug: $slug }) {
      id
      slug
      title
      description
      nft_collection_id {
        id
        contract_address
        chain_name
      }
      discount_value
      store_url
      date_start
      date_end
    }
  }
`;

export default {
  getCampaign: LOAD_CAMPAIGN_BY_SLUG
};
