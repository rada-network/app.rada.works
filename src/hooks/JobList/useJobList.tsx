import { useQuery } from '@apollo/client';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './JobList.gql';

export default (props: { operations: string; filter: object }) => {
  const { operations, filter } = props;
  const { getJobs } = mergeOperations(DEFAULT_OPERATIONS, operations);
  const { data, loading, error } = useQuery(getJobs, {
    variables: { filter }
  });

  return { loading, data, error };
};
