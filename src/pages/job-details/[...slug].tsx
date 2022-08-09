import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import JobDetailTmp from '../../components/templates/jobDetailTmp';

const JobDetails: NextPage = () => {
  const router = useRouter();
  const query = router?.query?.slug?.[0]?.split('-');
  const id = query ? parseInt(query[0]) : 0;
  return <JobDetailTmp id={id} />;
};

export default JobDetails;
