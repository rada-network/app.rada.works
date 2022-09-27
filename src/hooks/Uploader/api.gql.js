import { gql } from '@apollo/client';
import { initializeApollo } from '../../../src/libs/SystemApolloClient.js';

export const IMPORT_FILE = gql`
  mutation ImportJobFile(
    $url: String!
    $data: create_directus_files_input! #https://docs.directus.io/reference/files.html#the-file-object
  ) {
    import_file(url: $url, data: $data) {
      id
      storage
      filename_download
      uploaded_on
      modified_on
    }
  }
`;
export const importFileFunc = async (props) => {
  try {
    const { url, data } = props;
    const client = initializeApollo();
    return await client.mutate({
      mutation: IMPORT_FILE,
      variables: { url, data },
      fetchPolicy: 'no-cache'
      // nextFetchPolicy: 'cache-first'
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return error;
  }
};

export const DELETE_FILE = gql`
  mutation DeleteFile($fileId: ID!) {
    delete_files_item(id: $fileId) {
      id
    }
  }
`;
export const deleteFileFunc = async (fileId) => {
  const client = initializeApollo();
  return await client.mutate({
    mutation: DELETE_FILE,
    variables: { fileId },
    fetchPolicy: 'no-cache'
    // nextFetchPolicy: 'cache-first'
  });
};

export default {
  importFileFunc,
  deleteFileFunc
};
