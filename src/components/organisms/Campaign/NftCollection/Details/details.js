import React from 'react';
import Moment from 'moment';
import { useTranslation } from 'next-i18next';
import useThemes from '../../../../../hooks/useThemes';
import { useDetails } from '../../../../../hooks/Campaign/NftCollection';
import classes from './detail.module.css';
import Image from 'next/image';
import { toHTML } from '../../../../../utils/strUtils';
import List from '../../List';

const Details = (props) => {
  const { slug } = props;

  const { t } = useTranslation('nft_collection_details');

  Moment.locale('en');

  const { rootClassName } = useThemes();

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
      child = <div className={classes.loading}>{t('Loading...')}</div>;
    }
  } else {
    if (data.nft_collection) {
      const nftCollection = data.nft_collection[0];

      const coverImage = nftCollection.cover_image ? (
        <Image
          className={`${classes.nftCover}`}
          layout={`responsive`}
          width={`100%`}
          height={`100%`}
          src={nftCollection.cover_image}
          alt={`cover_${nftCollection.name}`}
        />
      ) : null;
      const thumbImage = nftCollection.thumb_image ? (
        <Image
          layout={`responsive`}
          width={`100%`}
          height={`100%`}
          src={nftCollection.thumb_image}
          alt={nftCollection.name}
        />
      ) : null;

      child = (
        <div className={`${classes[rootClassName]} ${classes.pageWrap}`}>
          <div
            className={`${classes.coverWrap} bg-gray-100 dark:bg-gray-900 bg-cover relative`}
          >
            {coverImage}
            <div className="py-32 mx-auto max-w-screen-xl relative">
              <a
                title={nftCollection.name}
                className="bg-gray-100 shadow-md border border-4 border-white block h-20 w-20 rounded-full overflow-hidden absolute -bottom-8 left-1/2 -mx-10"
              >
                {thumbImage}
              </a>
            </div>
          </div>

          <h1 className="text-gray-800 font-semibold text-center text-4xl mt-12">
            {nftCollection.name}
          </h1>

          <div className="text-center text-lg mt-3 font-semibold">
            {nftCollection.contract_address}
          </div>

          <div className="flex items-center justify-center mt-8">
            <div className="text-center mr-6">
              <strong className="block font-bold text-2xl">
                {nftCollection.nft_number
                  ? nftCollection.nft_number.toLocaleString()
                  : 0}
              </strong>
              <span className="text-gray-500">{t('items')}</span>
            </div>

            <div className="text-center ml-4 mr-6">
              <strong className="block font-bold text-2xl">
                {nftCollection.nft_holder_number
                  ? nftCollection.nft_holder_number.toLocaleString()
                  : 0}
              </strong>
              <span className="text-gray-500">{t('Owners')}</span>
            </div>

            <div className="text-center ml-4 mr-6">
              <strong className="block font-bold text-2xl">
                {nftCollection.total_value
                  ? nftCollection.total_value.toLocaleString()
                  : 0}
              </strong>
              <span className="text-gray-500">{t('Total value')}</span>
            </div>

            <div className="text-center ml-6">
              <strong className="block font-bold text-2xl">
                {nftCollection.floor_price
                  ? nftCollection.floor_price.toLocaleString()
                  : 0}
              </strong>
              <span className="text-gray-500">{t('Floor price')}</span>
            </div>
          </div>

          <div className={classes.pageContent}>
            <div
              className="mb-10"
              dangerouslySetInnerHTML={toHTML(nftCollection.description)}
            />
            <List
              nftCollectionId={parseInt(nftCollection.id)}
              position="nft-collection-details"
            />
          </div>
        </div>
      );
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
