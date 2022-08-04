import Router from 'next/router';
import { useCallback, useRef, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import slugify from 'slugify';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './createJobForm.gql';
import BrowserPersistence from '../../utils/simplePersistence';

export default (props) => {
  const { operations, jobId } = props;

  const { createJobMutation, editJobMutation, loadJobByIdQuery } =
    mergeOperations(DEFAULT_OPERATIONS, operations);

  const storage = new BrowserPersistence();

  const submittingJob = storage.getItem('submittingJob');
  let initialValues = submittingJob ? submittingJob : {};

  //load job information for initial values on form
  const {
    loading: jobLoading,
    error: jobLoadError,
    data: jobLoaded
  } = useQuery(loadJobByIdQuery, {
    /*fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',*/
    fetchPolicy: 'no-cache',
    skip: !jobId,
    variables: {
      id: jobId
    }
  });

  if (!jobLoading && jobLoaded && jobLoaded.job_by_id) {
    initialValues = jobLoaded.job_by_id;
  }

  const formApiRef = useRef(initialValues);
  const setFormApi = useCallback((api) => (formApiRef.current = api), []);
  const detailsEditorRef = useRef(
    initialValues.description ? initialValues.description : null
  );

  const mutationQuery = jobId ? editJobMutation : createJobMutation;
  const [
    submitCreateJobForm,
    { data, error: createJobError, loading: submitLoading }
  ] = useMutation(mutationQuery, {
    fetchPolicy: 'no-cache'
  });

  const handleSubmit = useCallback(
    async (submittedValues) => {
      try {
        submittedValues.price = parseFloat(submittedValues.price);
        submittedValues.duration = parseInt(submittedValues.duration);

        //saving submitted data to local storage
        storage.setItem('submittingJob', submittedValues, 3600);

        await submitCreateJobForm({
          variables: {
            id: jobId,
            slug: slugify(submittedValues.title).toLowerCase(),
            status: 'pending',
            is_featured: false,
            ...submittedValues
          }
        });

        //Reset form fields state
        if (formApiRef.current) {
          formApiRef.current.reset();
        }
        storage.removeItem('submittingJob');
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
    },

    [submitCreateJobForm, storage]
  );

  const handleCancel = useCallback(() => {
    Router.push('/');
  }, []);

  const errors = useMemo(
    () =>
      new Map([
        [jobId ? 'editJobMutation' : 'createJobMutation', createJobError],
        ['loadJobQuery', jobLoadError]
      ]),
    [createJobError, jobLoadError]
  );

  return {
    isBusy: jobLoading || submitLoading,
    errors,
    handleSubmit,
    handleCancel,
    setFormApi,
    formApiRef,
    detailsEditorRef,
    initialValues,
    response: data
  };
};
