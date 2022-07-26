/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import MainTmpl from './_mainTmpl';
import Joblisting from '../organisms/Joblist';

import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

const FindaJob = (props) => {
  return (
    <Fragment>
      <MainTmpl>
        <Joblisting page="joblist" />
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
