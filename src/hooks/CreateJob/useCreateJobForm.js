import Router from 'next/router';
import { useCallback, useRef, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import slugify from 'slugify';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './createJobForm.gql';

export default (props) => {
  const { operations, jobId, initialValues = {} } = props;

  const { createJobMutation, editJobMutation, loadJobByIdQuery } =
    mergeOperations(DEFAULT_OPERATIONS, operations);

  //load job information for initial values on form
  const {
    loading: jobLoading,
    error: jobLoadError,
    data: jobData
  } = useQuery(loadJobByIdQuery, {
    /*fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',*/
    fetchPolicy: 'no-cache',
    skip: !jobId,
    variables: {
      id: jobId
    }
  });

  if (!jobLoading && jobData && jobData.job_by_id.id) {
    initialValues.id = jobData.job_by_id.id;
    initialValues.title = jobData.job_by_id.title;
    initialValues.short_desc = jobData.job_by_id.short_desc;
    initialValues.date_started = jobData.job_by_id.date_started;
    initialValues.date_ends = jobData.job_by_id.date_ends;
    initialValues.description = jobData.job_by_id.description;
  }

  const formApiRef = useRef(initialValues);
  const setFormApi = useCallback((api) => (formApiRef.current = api), []);
  const detailsEditorRef = useRef('');

  const mutationQuery = jobId ? editJobMutation : createJobMutation;
  const [
    submitCreateJobForm,
    { data, error: createJobError, loading: submitLoading }
  ] = useMutation(mutationQuery, {
    fetchPolicy: 'no-cache'
  });

  const handleSubmit = useCallback(
    async (extraValues) => {
      try {
        await submitCreateJobForm({
          variables: {
            id: jobId,
            title: formApiRef.current.getValue('title'),
            slug: slugify(formApiRef.current.getValue('title')).toLowerCase(),
            shortDesc: formApiRef.current.getValue('short_desc'),
            description: detailsEditorRef.current.getContent(),
            startDate: extraValues.startDate,
            endDate: extraValues.endDate,
            status: 'draft' //default value
          }
        });

        // if (formApiRef.current) {
        //   formApiRef.current.reset();
        // }
        /*if (detailsEditorRef.current) {
            detailsEditorRef.current = null;
        }*/
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
    },

    [submitCreateJobForm]
  );

  const handleCancel = useCallback(() => {
    console.log('handleCancel()...');
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
    detailsEditorRef,
    initialValues,
    response: data
  };
};
