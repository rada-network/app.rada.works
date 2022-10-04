import { initializeApollo } from '../../libs/apolloClient';
import { CREATE_SOCIAL_LINK_GQL, GET_SOCIAL_LINK_GQL } from './social.gql';

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
export async function checkSocial(data: any) {
  const client = initializeApollo();
  try {
    const res = await client.query({
      query: GET_SOCIAL_LINK_GQL,
      variables: { data }
    });
    return res.data.social_link_items;
  } catch (error) {
    console.log(error);
    return error;
  }
}
