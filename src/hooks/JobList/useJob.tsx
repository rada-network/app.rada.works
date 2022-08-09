import { useQuery } from '@apollo/client';
import { LOAD_JOB_BY_SLUG } from './job.gql';

export default function useJob(props: { slug: object }) {
  const { slug } = props;
  const { data, loading, error } = useQuery(LOAD_JOB_BY_SLUG, {
    fetchPolicy: 'no-cache',
    skip: !slug,
    variables: {
      slug
    }
  });

  return { loading, data, error };
}
