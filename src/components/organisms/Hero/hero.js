import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import Image from 'next/image';
import ButtonLink from '../../atoms/ButtonLink';
import classes from './hero.module.css';
import { useHeroData } from 'src/hooks/useHeroData';
import { Data } from './sampleData';

const Hero = (props) => {
  const { type } = props;

  const data = useHeroData({
    type,
    Data
  });

  const btnReadMore =
    type === 'type-1' ? (
      <ButtonLink className="btn-blue" href={`/`}>
        Learn more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </ButtonLink>
    ) : null;

  //const checked = type == 'experienced' ? 'content-right' : 'content-left';
  return (
    <Fragment>
      <section className={`${classes[type]}`}>
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
          <div className={classes.title}>
            <h2 dangerouslySetInnerHTML={{ __html: data.get('title') }} />
          </div>
          <div className={classes.desc}>
            <p>{data.get('desc')}</p>
          </div>
          {btnReadMore}
        </div>
        <div className="w-full lg:w-1/2 lg:py-6 text-center hero-decor">
          <Image src="/hero-decor.png" alt="me" width="736" height="736" />
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
