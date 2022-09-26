import { initializeApollo } from '../../libs/SystemApolloClient.js';
import { CREATE_SOCIAL_GQL } from './api.gql';

export async function saveSocialData(data: any) {
  const client = initializeApollo();
  console.log('====================================');
  console.log('save social: ', data);
  console.log('====================================');
  try {
    const res = await client.mutate({
      mutation: CREATE_SOCIAL_GQL,
      variables: { data }
    });
    return res.data.create_social_link_item;
  } catch (error) {
    console.log(error);
    return error;
  }
}
