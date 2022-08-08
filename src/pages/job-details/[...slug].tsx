import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import JobDetailTmp from '../../components/templates/jobDetailTmp';

const JobDetails: NextPage = () => {
  const router = useRouter();
  const slug = router?.query?.slug?.[0];
  return <JobDetailTmp slug={slug || ''} />;
};

export default JobDetails;
