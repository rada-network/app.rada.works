import Router from 'next/router';
import { useCallback, useRef, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import slugify from 'slugify';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './api.gql';
import BrowserPersistence from '../../utils/simplePersistence';

export default (props) => {
  const { operations, campaignId } = props;

  const { addMutation, editMutation, loadCampaignByIdQuery } = mergeOperations(
    DEFAULT_OPERATIONS,
    operations
  );

  const storage = new BrowserPersistence();
  const submittingCampaign = storage.getItem('submittingCampaign');
  let initialValues = submittingCampaign ? submittingCampaign : {};

  //load campaign information for initial values on form
  const {
    loading: campaignLoading,
    error: campaignLoadError,
    data: campaignLoaded
  } = useQuery(loadCampaignByIdQuery, {
    fetchPolicy: 'no-cache',
    skip: !campaignId,
    variables: {
      id: campaignId
    }
  });

  if (!campaignLoading && campaignLoaded && campaignLoaded.campaign_by_id) {
    initialValues = campaignLoaded.campaign_by_id;
  }

  const formApiRef = useRef(initialValues);
  const setFormApi = useCallback((api) => (formApiRef.current = api), []);
  const detailsEditorRef = useRef(
    initialValues.description ? initialValues.description : null
  );

  // function to handle saving campaign information
  const mutationApi = campaignId ? editMutation : addMutation;
  const [
    saveCampaignInformation,
    {
      data: saveCampaignResult,
      error: createCampaignError,
      loading: saveCampaignLoading
    }
  ] = useMutation(mutationApi, {
    fetchPolicy: 'no-cache'
  });

  // function to handle callback after submit on the campaign form
  const handleSaveCampaign = useCallback(
    async (submittedValues) => {
      try {
        //saving submitted data to local storage
        storage.setItem('submittingCampaign', submittedValues, 3600);

        submittedValues.slug = slugify(submittedValues.title).toLowerCase();
        if (submittedValues.show_on_rada === undefined)
          submittedValues.show_on_rada = false;

        await saveCampaignInformation({
          variables: {
            id: campaignId ? parseInt(campaignId) : null,
            ...submittedValues
          }
        }).then(function (rs) {
          //Reset form fields state
          if (formApiRef.current) {
            formApiRef.current.reset();
          }
          storage.removeItem('submittingCampaign');
        });
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
    },

    [saveCampaignInformation, storage]
  );

  const handleCancel = useCallback(() => {
    Router.push('/');
  }, []);

  const handleFinished = useCallback(() => {
    Router.push('/');
  }, []);

  const errors = useMemo(
    () =>
      new Map([
        [campaignId ? 'editMutation' : 'addMutation', createCampaignError],
        ['loadCampaignQuery', campaignLoadError]
      ]),
    [createCampaignError, campaignLoadError]
  );

  return {
    setFormApi,
    formApiRef,
    detailsEditorRef,
    initialValues,
    handleSaveCampaign,
    handleCancel,
    handleFinished,
    isBusy: campaignLoading || saveCampaignLoading,
    errors,
    saveCampaignResult
  };
};
