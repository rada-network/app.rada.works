import React, { Fragment } from 'react';

const NftCollection = (props: { slug: string }) => {
  const { slug } = props;
  console.log(slug);
  return (
    <Fragment>
      <div>Nft Collection</div>
    </Fragment>
  );
};
export default NftCollection;
