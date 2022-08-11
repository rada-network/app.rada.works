import Router from 'next/router';
import { useCallback, useRef, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import slugify from 'slugify';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './createJobForm.gql';
import BrowserPersistence from '../../utils/simplePersistence';

export default (props) => {
  const { operations, jobId } = props;

  const {
    loadBackendFieldFunc,
    createJobMutation,
    editJobMutation,
    loadJobByIdQuery
  } = mergeOperations(DEFAULT_OPERATIONS, operations);

  const storage = new BrowserPersistence();
  const submittingJob = storage.getItem('submittingJob');
  let initialValues = submittingJob ? submittingJob : {};

  //load configuration of 'visual_style' field from backend
  loadBackendFieldFunc('job', 'visual_style').then(function (result) {
    storage.setItem('visualStyleField', result);
    return result;
  });

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
    initialValues.visual_style.map(function (vl, key) {
      if (vl) initialValues[`visual_style__${vl}`] = true;
    });
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

        // take selected visual style values
        submittedValues.visual_style = Object.keys(submittedValues).reduce(
          function (result, key) {
            if (key.includes('visual_style__') && submittedValues[key]) {
              key = key.split('__');
              result.push(key[1] ? key[1] : false);
            }
            return result;
          },
          []
        );

        console.log('Attachment Files:');
        console.log(storage.getItem('attachmentFiles'));

        //saving submitted data to local storage
        storage.setItem('submittingJob', submittedValues, 3600);

        submittedValues.visual_style = JSON.stringify(
          Object.values(submittedValues.visual_style)
        );

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

  const visualStyleField = storage.getItem('visualStyleField');
  return {
    isBusy:
      (visualStyleField && visualStyleField.loading) ||
      jobLoading ||
      submitLoading,
    errors,
    handleSubmit,
    handleCancel,
    setFormApi,
    formApiRef,
    detailsEditorRef,
    initialValues,
    visualStyleFieldData: visualStyleField ? visualStyleField.data : null,
    response: data
  };
};
