import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useFooter } from '../../../hooks/useFooter';
import classes from './footer.module.css';

import { DEFAULT_LINKS, LOREM_IPSUM } from './sampleData';

const Footer = (props) => {
  const { links } = props;
  const { welcomeText } = useFooter();

  return (
    <Fragment>
      <footer className={classes.root}>{welcomeText}</footer>
    </Fragment>
  );
};

export default Footer;

Footer.defaultProps = {
  links: DEFAULT_LINKS,
  loremtext: LOREM_IPSUM,
};

Footer.propTypes = {
  classes: shape({
    root: string,
  }),
};
