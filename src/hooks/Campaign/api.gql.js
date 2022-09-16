import { gql } from '@apollo/client';

export const CREATE_CAMPAIGN_FUNC = gql`
  mutation CreateCampaignFunction(
    $title: String!
    $slug: String!
    $nft_collection_ids: [create_campaign_nft_collection_input]
    $description: String
    $discount_value: Int!
    $coupon_codes: String!
    $store_name: String
    $store_logo_url: String
    $store_url: String
    $show_on_rada: Boolean
    $date_start: Date
    $date_end: Date
  ) {
    create_campaign_item(
      data: {
        title: $title
        slug: $slug
        nft_collection_ids: $nft_collection_ids
        description: $description
        discount_value: $discount_value
        coupon_codes: $coupon_codes
        store_name: $store_name
        store_logo_url: $store_logo_url
        store_url: $store_url
        show_on_rada: $show_on_rada
        date_start: $date_start
        date_end: $date_end
        status: "pending"
      }
    ) {
      id
      title
    }
  }
`;

export const EDIT_CAMPAIGN_FUNC = gql`
  mutation EditCampaignFunction(
    $id: ID!
    $title: String!
    $slug: String!
    $nft_collection_ids: [update_campaign_nft_collection_input]
    $description: String
    $discount_value: Int!
    $coupon_codes: String!
    $store_name: String
    $store_logo_url: String
    $store_url: String
    $show_on_rada: Boolean!
    $date_start: Date
    $date_end: Date
  ) {
    update_campaign_item(
      id: $id
      data: {
        title: $title
        slug: $slug
        nft_collection_ids: $nft_collection_ids
        description: $description
        discount_value: $discount_value
        coupon_codes: $coupon_codes
        store_name: $store_name
        store_logo_url: $store_logo_url
        store_url: $store_url
        show_on_rada: $show_on_rada
        date_start: $date_start
        date_end: $date_end
      }
    ) {
      id
      title
    }
  }
`;

export const LOAD_CAMPAIGN_BY_ID = gql`
  query LoadCampaignById($id: ID!) {
    campaign_by_id(id: $id) {
      id
      title
      slug
      description
      discount_value
      coupon_codes
      store_name
      store_logo_url
      store_url
      show_on_rada
      date_start
      date_end
      nft_collection_ids {
        nft_collection_id {
          id
          name
          contract_address
          chain_name
        }
      }
    }
  }
`;

export default {
  addMutation: CREATE_CAMPAIGN_FUNC,
  editMutation: EDIT_CAMPAIGN_FUNC,
  loadCampaignByIdQuery: LOAD_CAMPAIGN_BY_ID
};
