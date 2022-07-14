import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import classes from './hero.module.css';

const Hero = () => {
  return (
    <Fragment>
      <section className={classes.root}>test</section>
    </Fragment>
  );
};

Hero.propTypes = {
  classes: shape({
    root: string,
  }),
};

export default Hero;
