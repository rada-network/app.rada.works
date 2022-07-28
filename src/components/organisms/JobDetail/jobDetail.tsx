import React, { PureComponent } from 'react';

const jobDetail = (props: { child: object; jobid: number }) => {
  const { child, jobid } = props;
  return (
    <>
      <div>test</div>
      <div>{jobid}</div>
    </>
  );
};
export default jobDetail;
