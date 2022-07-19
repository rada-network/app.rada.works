import { useCallback, useRef, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import getApolloClient from '../../utils/client';
import mergeOperations from '../../utils/shallowMerge';
import DEFAULT_OPERATIONS from './createJobForm.gql';

export default (props) => {
  const { operations } = props;
  const { createJobMutation } = mergeOperations(DEFAULT_OPERATIONS, operations);

  const formApiRef = useRef(null);

  const client = getApolloClient();
  console.log(client);
  // let {loading, errors, data} = await client.mutate({
  //     mutation : createJobMutation,
  //     variables: {
  //         title,
  //         short_desc,
  //         description
  //     }
  // });

  const [submitForm, { data, error: createJobError, loading: submitLoading }] =
    useMutation(createJobMutation, {
      fetchPolicy: 'no-cache'
    });

  const setFormApi = useCallback((api) => (formApiRef.current = api), []);

  const handleSubmit = useCallback(
    async ({ title, short_desc, description }) => {
      try {
        await submitForm({
          variables: {
            title,
            short_desc,
            description
          }
        });
        if (formApiRef.current) {
          formApiRef.current.reset();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [submitForm]
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
    //response: data && data.createJob
  };
};
