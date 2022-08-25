import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import css from 'styled-jsx/css';
import Policy from '../organisms/Policy';

const styles = css`
  /* stylelint-disable */
`;

const PolicyTmp = () => {
  return (
    <Fragment>
      <MainTmpl>
        <Policy />
      </MainTmpl>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default PolicyTmp;
