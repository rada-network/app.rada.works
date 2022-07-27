/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import MainTmpl from './_mainTmpl';
import { CreateJobForm, Success } from '../organisms/CreateJob';
import useCreateJob from '../../hooks/CreateJob/useCreateJob';

import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

const CreateJobTmpl = (props) => {
  const { currentJobId, setCurrentJobId } = useCreateJob({});

  const child = currentJobId ? (
    <Success jobId={currentJobId} />
  ) : (
    <CreateJobForm setCurrentJobId={setCurrentJobId} />
  );

  return (
    <Fragment>
      <MainTmpl> {child} </MainTmpl>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

CreateJobTmpl.propTypes = {
  classes: shape({
    root: string
  })
};

export default CreateJobTmpl;
