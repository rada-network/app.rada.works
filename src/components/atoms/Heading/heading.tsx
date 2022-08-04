import React, { Fragment, FunctionComponent } from 'react';
import defaultClases from './heading.module.css';
import { useStyle } from '../../classify';
interface HeadingProps {
  children?: React.ReactNode;
  headingCls?: string;
  HeadingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subHeading?: string;
}
export const Heading: FunctionComponent<HeadingProps> = ({
  children,
  headingCls,
  HeadingType,
  subHeading
}) => {
  const classes = useStyle(defaultClases, { heading: headingCls });
  console.log(classes);
  const child = HeadingType ? (
    <HeadingType className={classes.heading}>{children}</HeadingType>
  ) : null;
  const SubHeading = subHeading ? (
    <div className={classes.subHeading}>
      <p>{subHeading}</p>
    </div>
  ) : null;

  return (
    <Fragment>
      {child}
      {SubHeading}
    </Fragment>
  );
};
