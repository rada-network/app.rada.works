import React from 'react';
export const heading = (props: {
  children: React.ReactNode;
  classes: string;
  level: number;
}) => {
  const { children, classes, level } = props;
  switch (level) {
    case 1:
      return <h1 className={`${classes}`}>{children}</h1>;
    case 2:
      return <h2 className={`${classes}`}>{children}</h2>;
    case 3:
      return <h3 className={`${classes}`}>{children}</h3>;
    case 4:
      return <h4 className={`${classes}`}>{children}</h4>;
    case 5:
      return <h5 className={`${classes}`}>{children}</h5>;
    case 6:
      return <h6 className={`${classes}`}>{children}</h6>;
    default:
      return null;
  }
};
