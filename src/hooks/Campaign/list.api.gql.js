import { gql } from '@apollo/client';

export const GET_CAMPAIGNS = gql`
  query getCampaigns(
    $filter: campaign_filter
    $sort: [String]
    $limit: Int
    $offset: Int
    $page: Int
    $search: String
  ) {
    campaign(
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
      page: $page
      search: $search
    ) {
      id
      title
      discount_value
      description
      store_name
      store_logo_url
      store_url
      #      date_created
      #      date_start
      #      date_end
      nft_collection_ids {
        #          campaing_id {
        #              id
        #          }
        nft_collection_id {
          #           id
          name
          slug
          contract_address
          chain_name
        }
      }
      user_created {
        id
      }
    }
  }
`;

export default {
  getCampaigns: GET_CAMPAIGNS
};
