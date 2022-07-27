import { useState } from 'react';

export default (props) => {
  const jobId = props.jobId ? props.jobId : null;

  const [currentJobId, setCurrentJobId] = useState(jobId);

  return {
    currentJobId,
    setCurrentJobId
  };
};
