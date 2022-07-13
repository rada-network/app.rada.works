import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useHeader } from '../../../hooks/useHeader';
import classes from './header.module.css';

const Header = (props) => {
  const { welcomeText } = useHeader();

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
