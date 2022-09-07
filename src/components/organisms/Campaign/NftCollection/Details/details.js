import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Moment from 'moment';
// import Related from '../Related'; coming soon
import Subcribe from '../../Subcribe';
import { useDetails } from '../../../../../hooks/Campaign/NftCollection';
import classes from './detail.module.css';

const Details = (props) => {
  const { slug } = props;

  const { t } = useTranslation('nft_collection_details');

  Moment.locale('en');

  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState();
  useEffect(() => {
    resolvedTheme === 'light' ? setIsDark(false) : setIsDark(true);
  }, [resolvedTheme]);

  const rootClassName = isDark ? 'rootDark' : 'root';

  const { loading, data, error } = useDetails({
    slug: { _eq: slug } ?? ''
  });

  let child = null;
  if (!data) {
    if (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      child = t('Something went wrong.');
    } else if (loading) {
      child = <div>{t('Loading...')}</div>;
    }
  } else {
    if (data.nft_collection) {
      const nftCollection = data.nft_collection[0];

      child = (
        <div className={classes.pageWrap}>
          <div className={classes.pageContent}>
            <h1 className={classes.pageTitle}>{nftCollection.name}</h1>
            {/*for examples to show sub info */}
            <div>Chain: {nftCollection.chain_name}</div>
            <div>Contract: {nftCollection.contract_address}</div>
            Other details of NFT Collection goes here...
          </div>
          <div className={classes.pageSidebar}>
            {/*<Related currentNftCollection={nftCollection} />*/}
            <Subcribe />
          </div>
        </div>
      );
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
