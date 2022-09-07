import { gql } from '@apollo/client';

export const LOAD_NFT_COLLECTION_BY_SLUG = gql`
  query LoadNftCollectionBySlug($slug: string_filter_operators!) {
    nft_collection(filter: { slug: $slug }) {
      id
      name
      category
      chain_name
      contract_address
      nft_holder_number
      total_value
      discord
      telegram
    }
  }
`;

export default {
  getNftCollection: LOAD_NFT_COLLECTION_BY_SLUG
};
