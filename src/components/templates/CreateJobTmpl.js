import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import CreateJobForm from '../organisms/CreateJobForm';

import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

const CreateJobTmpl = (props) => {
  return (
    <Fragment>
      <Header />
      <CreateJobForm />
      <Footer />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

CreateJobTmpl.propTypes = {
  classes: shape({
    root: string,
  }),
};

export default CreateJobTmpl;
