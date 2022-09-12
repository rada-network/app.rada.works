import React from 'react';
import Router from 'next/router';
import { shape, string } from 'prop-types';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { ellipsify, subStrWords, toHTML } from '../../../../../utils/strUtils';
import classes from './item.module.css';
import useThemes from '../../../../../hooks/useThemes';

const DESC_MAX_LENGTH = 200;

const Item = (props) => {
  const { data } = props;

  const { rootClassName } = useThemes();

  const { t } = useTranslation('nft_collection_details');

  const viewDetails = () => {
    const path = `/nft-collection-details/${data.slug}`;
    Router.push(path);
  };

  const coverImage = data.cover_image ? (
    <Image
      className={`${classes.nftCover}`}
      layout={`responsive`}
      width={`100%`}
      height={`100%`}
      src={data.cover_image}
      alt={`cover_${data.name}`}
    />
  ) : null;
  const thumbImage = data.thumb_image ? (
    <Image
      layout={`responsive`}
      width={`100%`}
      height={`100%`}
      src={data.thumb_image}
      alt={data.name}
    />
  ) : null;

  const desc = data.description ? (
    <div
      className="p-4 text-center"
      dangerouslySetInnerHTML={toHTML(
        subStrWords(data.description, DESC_MAX_LENGTH)
      )}
    />
  ) : null;

  return (
    <div className={`${classes[rootClassName]}`} onClick={viewDetails}>
      <div
        className={`${classes.coverWrap} overflow-hidden rounded-t-lg max-h-52`}
      >
        {coverImage}
      </div>

      <div className="flex items-center justify-center flex-col px-4 -mt-10 z-10">
        <div className="bg-gray-200 border-4 border-white shadow-md w-20 h-20 overflow-hidden rounded-full">
          {thumbImage}
        </div>

        <div className="pt-4 text-center">
          <h3 className="mt-0 mb-2 font-semilbold text-lg text-gray-800 leading-none">
            {data.name}
          </h3>
          <div className="m-0 flex items-center">
            <span
              className={`${
                classes[data.chain_name]
              } bg-gray-50 inline-block h-7 w-7 rounded-full mr-2 bsc`}
            />
            {ellipsify({
              str: data.contract_address,
              start: 6,
              end: 4
            })}
          </div>
        </div>
      </div>
      {desc}
    </div>
  );
};

Item.propTypes = {
  classes: shape({
    root: string
  }),
  data: shape({
    id: string,
    title: string
  })
};

export default Item;
