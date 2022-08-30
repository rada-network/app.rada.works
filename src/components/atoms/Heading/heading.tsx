import React, { Fragment, FunctionComponent, useEffect } from 'react';
import { useTheme } from 'next-themes';
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
  const { theme } = useTheme();
  const [isDark, setIsDark] = React.useState(true);
  useEffect(() => {
    theme === 'light' ? setIsDark(false) : setIsDark(true);
  }, [theme]);
  const classes = useStyle(defaultClases, propClasses);
  const headingCls = isDark ? classes.headingDark : classes.heading;
  const heading = HeadingType ? (
    <HeadingType className={headingCls}>{children}</HeadingType>
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
