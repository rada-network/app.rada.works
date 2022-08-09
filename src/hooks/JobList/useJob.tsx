import { useQuery } from '@apollo/client';
import { LOAD_JOB_BY_ID } from './job.gql';

export default function useJob(props: { jobId: number }) {
  const { jobId } = props;
  const { data, loading, error } = useQuery(LOAD_JOB_BY_ID, {
    fetchPolicy: 'no-cache',
    skip: !jobId,
    variables: {
      id: jobId
    }
  });

  return { loading, data, error };
}
