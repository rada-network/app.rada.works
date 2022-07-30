import { useCallback, useRef, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import slugify from 'slugify';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './createJobForm.gql';

export default (props) => {
  const { operations } = props;
  const { createJobMutation } = mergeOperations(DEFAULT_OPERATIONS, operations);

  const formApiRef = useRef(null);
  const setFormApi = useCallback((api) => (formApiRef.current = api), []);

  const detailsEditorRef = useRef(null);

  const [
    submitCreateJobForm,
    { data, error: createJobError, loading: submitLoading }
  ] = useMutation(createJobMutation, {
    fetchPolicy: 'no-cache'
  });

  const handleSubmit = useCallback(
    async (extraValues) => {
      try {
        await submitCreateJobForm({
          variables: {
            title: formApiRef.current.getValue('title'),
            slug: slugify(formApiRef.current.getValue('title')).toLowerCase(),
            shortDesc: formApiRef.current.getValue('short_desc'),
            description: detailsEditorRef.current.getContent(),
            startDate: extraValues.startDate,
            endDate: extraValues.endDate,
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
    detailsEditorRef,
    response: data
  };
};
