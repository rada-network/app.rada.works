/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import MainTmpl from './_mainTmpl';
import { CreateJobForm } from '../organisms/CreateJob';

const CreateJobTmpl = (props) => {
  const { jobId } = props;

  const child = <CreateJobForm jobId={jobId} />;

  return (
    <Fragment>
      <MainTmpl> {child} </MainTmpl>
    </Fragment>
  );
};

CreateJobTmpl.propTypes = {
  classes: shape({
    root: string
  }),
  jobId: string
};

export default CreateJobTmpl;
