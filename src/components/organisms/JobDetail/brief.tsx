import React, { Fragment } from 'react';

export const Brief = (props: {
  data: {
    description: string;
    title: string;
    id: string;
    classes: string;
  };
}) => {
  const { data } = props;
  return (
    <Fragment>
      <div className={`${data.classes} pt-9`}>
        <h1 className={`${data.classes} font-bold text-4xl dark:text-white`}>
          {data.title}
        </h1>
        <p
          className={`${data.classes}`}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </Fragment>
  );
};
