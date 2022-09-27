import { initializeApollo } from '../../libs/apolloClient';
import { CREATE_SOCIAL_LINK_GQL } from './social.gql';

export async function saveSocialData(data: any) {
  const client = initializeApollo();
  try {
    const res = await client.mutate({
      mutation: CREATE_SOCIAL_LINK_GQL,
      variables: { data }
    });
    return res.data.create_social_link_item;
  } catch (error) {
    console.log(error);
    return error;
  }
}
