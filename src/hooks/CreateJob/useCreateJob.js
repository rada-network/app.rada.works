import { useCallback, useState } from 'react';

export default (props) => {
  const jobId = props.jobId ? props.jobId : null;

  const [currentJobId, setCurrentJobId] = useState(jobId);
  const [createJobMode, setCreateJobMode] = useState(jobId ? 'edit' : 'add');

  const onEditAction = useCallback(
    async (props) => {
      if (props.jobId) {
        setCurrentJobId(props.jobId);
        setCreateJobMode('edit');
      }
    },
    [setCurrentJobId, setCreateJobMode]
  );

  return {
    currentJobId,
    setCurrentJobId,
    createJobMode,
    setCreateJobMode,
    onEditAction
  };
};
