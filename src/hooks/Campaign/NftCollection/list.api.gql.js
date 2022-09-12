import { gql } from '@apollo/client';

export const GET_NFT_COLLECTIONS = gql`
  query getNftCollections(
    $filter: nft_collection_filter
    $sort: [String]
    $limit: Int
    $offset: Int
    $page: Int
    $search: String
  ) {
    nft_collection(
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
      page: $page
      search: $search
    ) {
      id
      name
      slug
      category
      chain_name
      contract_address
      cover_image
      thumb_image
      description
      nft_holder_number
      total_value
      discord
      telegram
    }
  }
`;

export default {
  getNftCollections: GET_NFT_COLLECTIONS
};
