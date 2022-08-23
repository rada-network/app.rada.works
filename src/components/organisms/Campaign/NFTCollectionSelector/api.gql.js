import { gql } from '@apollo/client';

export const GET_NFT_COLLECTION = gql`
  query getNFTCollection($filter: nft_collection_filter) {
    nft_collection(filter: $filter) {
      id
      name
    }
  }
`;

export default {
  getNFTCollection: GET_NFT_COLLECTION
};
