import React, { PureComponent } from 'react';

const jobDetail = (props: { slug: [] }) => {
  const { slug } = props;
  return (
    <>
      <div>test</div>
      <div>{JSON.stringify(slug)}</div>
    </>
  );
};
export default jobDetail;
