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

  //build NFT collection information
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

  return (
    <div className={`${classes[rootClassName]}`}>
      <div className="bg-gray-100 rounded-lg">Cover</div>

      <h3 className={classes.title}>{data.title}</h3>
      {editButton}

      <div className={classes.itemBody}>
        <div
          dangerouslySetInnerHTML={toHTML(
            subStrWords(data?.description, DESC_MAX_LENGTH)
          )}
        />

        <div className="flex items-center flex-wrap mt-5">
          {nftCollectionInfo}
        </div>
      </div>

      <div className={classes.itemFoot}>
        {storeInfo}
        {discountAmountInfo}
        <Button
          priority="high"
          type="button"
          onPress={viewDetails}
          className={classes.getCoupon}
        >
          {t('Get this deal')}
        </Button>
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
