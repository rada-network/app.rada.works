import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import Image from 'next/image';
import Router from 'next/router';
import Button from '../../atoms/Button';
import classes from './hero.module.css';
import { useHeroData } from 'src/hooks/useHeroData';
import { Data } from './sampleData';

const Hero = (props) => {
  const { type } = props;

  const data = useHeroData({
    type,
    Data
  });
  const handleClick = () => {
    console.log('clicked');
    let path = `/test-1`;
    Router.push(path);
  };
  const btnReadMore =
    type === 'type-1' ? (
      <Button priority="high" onClick={handleClick}>
        Learn more
        <i className="fa fa-angle-right ml-2" />
      </Button>
    ) : null;

  //const checked = type == 'experienced' ? 'content-right' : 'content-left';
  return (
    <Fragment>
      <section className={`${classes[type]}`}>
        <div className={classes[type].heading}>
          <h2
            className={classes.title}
            dangerouslySetInnerHTML={{ __html: data.get('title') }}
          />
          <div className={classes.desc}>
            <p>{data.get('desc')}</p>
          </div>
          {btnReadMore}
        </div>
        <div className={classes[type].media}>
          <Image src="/hero-1.png" alt="me" width="648" height="648" />
        </div>
      </section>
    </Fragment>
  );
};

Hero.propTypes = {
  classes: shape({
    root: string
  }),
  type: string.isRequired
};

export default Hero;
