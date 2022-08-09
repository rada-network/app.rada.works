/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import css from 'styled-jsx/css';
import JobDetail from '../organisms/JobDetail';

const styles = css`
  /* stylelint-disable */
`;

const JobDetailTmp = (props: { slug: string }) => {
  return (
    <Fragment>
      <MainTmpl>
        <JobDetail slug={props.slug} />
      </MainTmpl>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

JobDetailTmp.propTypes = {};

export default JobDetailTmp;
