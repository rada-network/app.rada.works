import React from 'react';
import Router from 'next/router';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import { toHTML, subStrWords, ellipsify } from '../../../../utils/strUtils';
import Button from '../../../atoms/Button';
import classes from './item.module.css';
import useThemes from '../../../../hooks/useThemes';
import TextLink from '../../../atoms/TextLink';

const DESC_MAX_LENGTH = 200;

const Item = (props) => {
  const { data } = props;

  const { data: session } = useSession();

  const { rootClassName } = useThemes();

  const { t } = useTranslation('campaign_details');

  const viewDetails = () => {
    const path = `/campaign-details/${data.slug}`;
    Router.push(path);
  };

  const handleEdit = () => {
    const path = `/edit-campaign/${data.id}`;
    Router.push(path);
  };

  const currentUserId = session && session.id ? session.id : null;
  const editButton =
    data.user_created.id === currentUserId ? (
      <Button priority="normal" type="button" onPress={handleEdit}>
        {t('Edit')}
      </Button>
    ) : null;

  // Build NFT collection information
  const nftCollectionInfo = data.nft_collection_ids.length
    ? data.nft_collection_ids.map((nftCollection, index) => (
        <div key={index} className={`${classes.nftCollectionWrap}`}>
          <span
            className={`${classes.chain} ${
              classes[nftCollection.nft_collection_id.chain_name]
            }`}
          >
            {nftCollection.nft_collection_id.chain_name}
          </span>
          <TextLink
            className={classes.nftCollectionLink}
            href={`/nft-collection-details/${nftCollection.nft_collection_id.slug}`}
          >
            <span className={`${classes.collectionName}`}>
              {nftCollection.nft_collection_id.name}
            </span>{' '}
            <span className={classes.contractAdd}>
              (
              {ellipsify({
                str: nftCollection.nft_collection_id.contract_address,
                start: 6,
                end: 4
              })}
              )
            </span>{' '}
          </TextLink>
        </div>
      ))
    : null;

  // Build store info
  const storeLogo = data.store_logo_url ? (
    <img
      className={`${classes.storeLogo}`}
      src={data.store_logo_url}
      alt={`cover_${data.store_name}`}
    />
  ) : null;
  const storeInfo = data.store_url ? (
    <TextLink
      className={classes.storeLink}
      target={`_blank`}
      href={data.store_url}
    >
      {storeLogo}
      <span className={classes.storeName}> {data.store_name} </span>
    </TextLink>
  ) : (
    <span className={classes.storeName}> {data.store_name} </span>
  );

  const discountAmountInfo = data.discount_value ? (
    <span className={classes.couponAmoun}>
      {data.discount_value}% {t('Off')}
    </span>
  ) : null;

  // Build cover and thumb images
  const assetsBaseUrl = process.env.MEDIA_BASE_URL;
  const coverOptions = 'fit=cover&width=300&height=300&quality=75';
  const thumbOptions = 'fit=cover&width=100&height=100&quality=75';
  const coverImage =
    data.cover_image && data.cover_image.id ? (
      <img
        className={`${classes.campaignCover}`}
        src={`${assetsBaseUrl}/${data.cover_image.id}?${coverOptions}`}
        alt={`${data.cover_image.title}`}
      />
    ) : null;
  const thumbImage =
    data.cover_image && data.thumb_image.id ? (
      <img
        className={`${classes.campaignThumb}`}
        src={`${assetsBaseUrl}/${data.thumb_image.id}?${thumbOptions}`}
        alt={`${data.thumb_image.title}`}
      />
    ) : null;

  return (
    <div className={`${classes[rootClassName]}`}>
      <div className="bg-gray-100 rounded-lg">{coverImage}</div>
      <div className="bg-gray-100 rounded-lg">{thumbImage}</div>

      <div className={`${classes.itemContent} p-4`}>
        <h3 className="text-lg text-gray-800 font-bold leading-6 mt-0 mb-3">
          {data.title}
        </h3>
        <div
          dangerouslySetInnerHTML={toHTML(
            subStrWords(data?.description, DESC_MAX_LENGTH)
          )}
        />
      </div>

      {editButton}

      <div className={`${classes.itemBody} py-0 px-4`}>
        <div className="flex items-center flex-wrap mt-5">
          {nftCollectionInfo}
        </div>
      </div>

      <Button
        priority="high"
        type="button"
        onPress={viewDetails}
        className={classes.getCoupon}
      >
        {t('Get this deal')}
      </Button>

      <div className={classes.itemFoot}>
        {storeInfo}
        {discountAmountInfo}
      </div>
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
