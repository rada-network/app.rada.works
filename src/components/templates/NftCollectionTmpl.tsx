import React, { Fragment, FunctionComponent } from 'react';
import MainTmpl from './_mainTmpl';
import NftCollection from '../organisms/NftCollection';
interface NftCollectionProps {
  slug: string;
}
const NftCollectionTmpl: FunctionComponent<NftCollectionProps> = (props) => {
  const { slug } = props;
  return (
    <Fragment>
      <MainTmpl>
        <NftCollection slug={slug} />
      </MainTmpl>
    </Fragment>
  );
};

export default NftCollectionTmpl;
