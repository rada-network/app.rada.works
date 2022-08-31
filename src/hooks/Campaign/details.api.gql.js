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

export const GET_COUPON_CODES_BY_SLUG = gql`
  query GetCouponCodesBySlug($slug: string_filter_operators!) {
    campaign(filter: { slug: $slug }) {
      coupon_codes
    }
  }
`;

export default {
  getCampaign: LOAD_CAMPAIGN_BY_SLUG,
  getCouponCodes: GET_COUPON_CODES_BY_SLUG
};
