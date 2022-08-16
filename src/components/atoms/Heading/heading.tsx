import React, { Fragment, FunctionComponent } from 'react';
import defaultClases from './heading.module.css';
import { useStyle } from '../../classify';
interface HeadingProps {
  children?: React.ReactNode;
  classes?: object;
  HeadingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subHeading?: string;
}
export const Heading: FunctionComponent<HeadingProps> = ({
  children,
  classes: propClasses,
  HeadingType,
  subHeading
}) => {
  const classes = useStyle(defaultClases, propClasses);
  const heading = HeadingType ? (
    <HeadingType className={classes.heading}>{children}</HeadingType>
  ) : null;
  const SubHeading = subHeading ? (
    <div className={classes.subHeading}>{subHeading}</div>
  ) : null;

  return (
    <Fragment>
      {heading}
      {SubHeading}
    </Fragment>
  );
};
