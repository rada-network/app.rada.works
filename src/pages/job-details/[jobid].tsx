import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import JobDetailTmp from '../../components/templates/jobDetailTmp';

const JobDetails: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  return <JobDetailTmp jobid={router?.query?.jobid} />;
};

export default JobDetails;
