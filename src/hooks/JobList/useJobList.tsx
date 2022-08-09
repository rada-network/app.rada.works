import { useQuery } from '@apollo/client';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './jobList.gql';

const UseJobList = (props: { page: string; operations: string }) => {
  const { page, operations } = props;
  let filter = {};
  if (page === 'joblist') {
    filter = {
      status: { _eq: 'published' }
    };
  } else {
    filter = {
      is_featured: { _eq: true },
      status: { _eq: 'published' }
    };
  }
  const { getJobs } = mergeOperations(DEFAULT_OPERATIONS, operations);
  const { data, loading, error } = useQuery(getJobs, {
    variables: { filter }
  });

  return { loading, data, error };
};

export default UseJobList;
