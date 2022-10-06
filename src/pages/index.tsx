import React from 'react';
import { NextPage } from 'next';
import HomeTmpl from '../components/templates/homeTmpl';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HomePage: NextPage = () => {
  const child = <HomeTmpl />;
  return child;
};

export default HomePage;

export async function getStaticProps(props: { locale: string }) {
  props.locale = props.locale ? props.locale : 'en';
  return {
    props: {
      ...(await serverSideTranslations(props.locale, ['common']))
    }
  };
}
