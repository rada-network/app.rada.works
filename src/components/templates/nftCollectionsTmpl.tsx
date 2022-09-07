/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import MainTmpl from './_mainTmpl';
import List from '../organisms/Campaign/NftCollection/List';

const NftCollectionsTmpl = () => {
  return (
    <Fragment>
      <MainTmpl>
        <List />
      </MainTmpl>
    </Fragment>
  );
};

NftCollectionsTmpl.propTypes = {
  classes: shape({
    root: string
  })
};

export default NftCollectionsTmpl;
