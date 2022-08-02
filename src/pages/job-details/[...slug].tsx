import type { NextPage } from 'next';
import { object } from 'prop-types';
import { useRouter } from 'next/router';
import JobDetailTmp from '../../components/templates/jobDetailTmp';

const JobDetails: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  return <JobDetailTmp slug={router?.query?.slug || []} />;
};

export default JobDetails;
