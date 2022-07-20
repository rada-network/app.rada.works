/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import MainTmpl from './_mainTmpl';
import CreateJobForm from '../organisms/CreateJobForm';

import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

const CreateJobTmpl = (props) => {
  return (
    <Fragment>
      <MainTmpl>
        <CreateJobForm />
      </MainTmpl>
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
