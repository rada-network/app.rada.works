import { initializeApollo } from '../../libs/apolloClient';
import { useQuery } from '@apollo/client';
import {
  CREATE_SOCIAL_LINK_GQL,
  GET_SOCIAL_LINK_GQL,
  GET_SOCIAL_LINK_GQL2
} from './social.gql';

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
export async function CheckSocial(sestion: any) {
  const client = initializeApollo();
  const user_email = sestion?.user?.email;
  const data = {
    user_created: { email: { _eq: user_email } }
  };
  try {
    const res = await client.query({
      query: GET_SOCIAL_LINK_GQL,
      variables: { data },
      fetchPolicy: 'no-cache'
    });
    return res.data.social_link;
  } catch (error) {
    console.log(error);
    // return error;
    return null;
  }
}
export async function CheckSocial2(fillter: any) {
  const { data, loading, error } = useQuery(GET_SOCIAL_LINK_GQL2, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { fillter }
  });
  return { data, loading, error };
}
