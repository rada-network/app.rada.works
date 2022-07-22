import { useCallback, useRef, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './createJobForm.gql';

export default (props) => {
  const { operations } = props;
  const { createJobMutation } = mergeOperations(DEFAULT_OPERATIONS, operations);

  const formApiRef = useRef(null);

  const setFormApi = useCallback((api) => (formApiRef.current = api), []);

  const [
    submitCreateJobForm,
    { data, error: createJobError, loading: submitLoading }
  ] = useMutation(createJobMutation, {
    fetchPolicy: 'no-cache'
  });

  const handleSubmit = useCallback(
    async (formValues) => {
      try {
        await submitCreateJobForm({
          variables: {
            title: formValues.title,
            short_desc: formValues.short_desc,
            description: formValues.description,
            status: 'draft' //default value
          }
        });

        if (formApiRef.current) {
          formApiRef.current.reset();
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
    },
    [submitCreateJobForm]
  );

  const errors = useMemo(
    () => new Map([['createJobMutation', createJobError]]),
    [createJobError]
  );

  return {
    errors,
    handleSubmit,
    isBusy: submitLoading,
    setFormApi,
    response: data
  };
};
