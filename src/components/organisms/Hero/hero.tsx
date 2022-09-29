import React, { Fragment } from 'react';
import classes from './hero.module.css';
const Hero = () => {
  return (
    <Fragment>
      <section className={classes.hero}>
        <h1 className="hero__title">Hero</h1>
      </section>
    </Fragment>
  );
};

export default Hero;
