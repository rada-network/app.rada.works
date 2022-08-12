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
    importFileFunc,
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
  console.log(initialValues);

  // function to handle saving job information
  const mutationQuery = jobId ? editJobMutation : createJobMutation;
  const [
    submitCreateJobForm,
    { data, error: createJobError, loading: submitLoading }
  ] = useMutation(mutationQuery, {
    fetchPolicy: 'no-cache'
  });

  // function to handle callback after submit on the job form
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

        //saving submitted data to local storage
        storage.setItem('submittingJob', submittedValues, 3600);

        submittedValues.visual_style = JSON.stringify(
          Object.values(submittedValues.visual_style)
        );

        // process to import attachment files to backend
        const jobAttachFiles = storage.getItem('jobAttachmentFiles');
        let importedFileIds = [];
        if (jobAttachFiles !== undefined) {
          jobAttachFiles.map(async (file, key) => {
            const { data: importedData } = await importFileFunc({
              url: file.uploadURL,
              data: {
                title: file.name,
                type: file.type,
                storage: 'local',
                filename_download: file.name,
                uploaded_on: new Date(),
                modified_on: new Date()
              }
            });
            //{"data":{"import_file":{"id":"c8b91309c01b","__typename":"directus_files"}}}

            if (importedData.import_file) {
              importedFileIds.push({
                id: ++key,
                // job_id: jobId,
                directus_files_id: importedData.import_file.id
              });
            }
          });
        }

        console.log('importedFileIds', importedFileIds);

        await submitCreateJobForm({
          variables: {
            id: jobId,
            slug: slugify(submittedValues.title).toLowerCase(),
            status: 'pending',
            attachments: importedFileIds
              ? JSON.stringify(importedFileIds)
              : null,
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
