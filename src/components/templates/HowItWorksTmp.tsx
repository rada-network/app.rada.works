/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import css from 'styled-jsx/css';
import Steps from '../organisms/HowItWork';

const styles = css`
  /* stylelint-disable */
`;

const HowItWorksTmp = (props: any) => {
  const { children } = props;
  console.log(children);
  return (
    <Fragment>
      <MainTmpl>
        <div>{children}</div>
      </MainTmpl>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

HowItWorksTmp.propTypes = {};

export default HowItWorksTmp;
