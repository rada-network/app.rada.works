import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useHeader } from '../../../hooks/useHeader';
import classes from './header.module.css';

const Header = (props) => {
  const { links } = props;
  const { welcomeText } = useHeader();
  console.log(links);
  return (
    <Fragment>
      <header className={classes.root}>{welcomeText}</header>
    </Fragment>
  );
};

Header.propTypes = {
  classes: shape({
    root: string,
  }),
};

export default Header;
