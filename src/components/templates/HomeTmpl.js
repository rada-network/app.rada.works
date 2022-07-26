/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import JobList from '../organisms/JobList';
import Hero from '../organisms/Hero';
import Steps from '../organisms/HowItWork';
import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

const HomeTmpl = (props) => {
  return (
    <Fragment>
      <MainTmpl>
        <Hero type="type-1" />
        <JobList page="homepage" />
        <Steps />
        <Hero type="type-2" />
        <Hero type="type-3" />
      </MainTmpl>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

HomeTmpl.propTypes = {};

export default HomeTmpl;
