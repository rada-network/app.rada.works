import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import css from 'styled-jsx/css';
import TermofServices from '../organisms/TermOfServices';

const styles = css`
  /* stylelint-disable */
`;

const TermTmp = () => {
  return (
    <Fragment>
      <MainTmpl>
        <TermofServices />
      </MainTmpl>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default TermTmp;
