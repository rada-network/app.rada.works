import { useQuery } from '@apollo/client';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './JobList.gql';

const UseJobList = (props: {
  page: string;
  slug: string;
  operations: string;
}) => {
  const { page, slug, operations } = props;
  let filter = {};
  if (page === 'joblist') {
    filter = {
      id: { _gt: 0 }
    };
  } else if (page === 'jobdetail') {
    filter = {
      slug: { _eq: slug }
    };
  } else {
    filter = {
      is_featured: { _eq: true }
    };
  }
  const { getJobs } = mergeOperations(DEFAULT_OPERATIONS, operations);
  const { data, loading, error } = useQuery(getJobs, {
    variables: { filter }
  });

  return { loading, data, error };
};

export default UseJobList;
