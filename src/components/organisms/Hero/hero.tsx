import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import Image from 'next/image';
import classes from './hero.module.css';
import { useHeroData } from 'src/hooks/useHeroData';
import { Data } from './sampleData';

const Hero = (props) => {
  const { types } = props;
  const data = useHeroData(types, Data);
  const checked = types == 'experienced' ? 'content-right' : 'content-left';
  return (
    <Fragment>
      <section className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
          <div className="font-bold text-3xl my-4">
            <h1 dangerouslySetInnerHTML={{ __html: data.get('title') }} />
          </div>
          <div className="leading-normal mb-4">
            <p>{data.get('desc')}</p>
          </div>
          <button className="bg-transparent hover:bg-black text-black hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-black hover:border-transparent">
            Button
          </button>
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
    root: string,
  }),
  types: string.isRequired,
  data: string,
};

export default Hero;
