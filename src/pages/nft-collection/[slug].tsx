import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NftCollectionTmpl from '../../components/templates/NftCollectionTmpl';

const NftCollection: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const child = <NftCollectionTmpl slug={slug} />;

  return <Fragment>{child}</Fragment>;
};

export default NftCollection;

export async function getStaticProps(props: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(props.locale, [
        'common',
        'create_campaign'
      ]))
      // Will be passed to the page component as props
    }
  };
}

export const getStaticPaths: GetStaticPaths<{ jobId: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  };
};
