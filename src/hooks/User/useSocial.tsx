// import { useQuery } from '@apollo/client';
import { initializeApollo } from '../../libs/apolloClient';
import { CREATE_SOCIAL_LINK_GQL, GET_SOCIAL_LINK_GQL } from './social.gql';

export const saveSocialLink = async (data: any) => {
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
};
/*export const CheckSocial = (sestion: any) => {
  const user_email = sestion?.user?.email;
  const filter = {
    user_created: { email: { _eq: user_email } }
  };
  const { data, loading, error } = useQuery(GET_SOCIAL_LINK_GQL, {
    variables: { filter },
    fetchPolicy: 'no-cache'
  });
  return { data, loading, error };
};*/
export const checkExistsSocialLink = async (
  socialName: any,
  userCreated: any
) => {
  let rs = null;
  const client = initializeApollo();
  try {
    const { data } = await client.query({
      query: GET_SOCIAL_LINK_GQL,
      variables: {
        social_name: socialName,
        user_created: userCreated
      },
      fetchPolicy: 'no-cache'
    });
    if (data.social_link && data.social_link[0]) {
      rs = data.social_link[0].id;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return error;
  }

  return rs;
};

export default {
  saveSocialLink,
  checkExistsSocialLink
};
