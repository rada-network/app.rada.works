/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import MainTmpl from './_mainTmpl';
import Joblist from '../organisms/JobList';

import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

const FindaJob = (props) => {
  return (
    <Fragment>
      <MainTmpl>
        <Joblist page="joblist" />
      </MainTmpl>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

FindaJob.propTypes = {
  classes: shape({
    root: string
  })
};

export default FindaJob;
