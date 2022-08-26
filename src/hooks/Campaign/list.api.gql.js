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
      date_created
    }
  }
`;

export default {
  getCampaigns: GET_CAMPAIGNS
};
