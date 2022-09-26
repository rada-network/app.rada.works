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

  return (
    <div className={`${classes[rootClassName]}`}>
      <div className={classes.itemHead}>
        <span className={classes.couponAmoun}>
          {data.discount_value}% {t('Off')}
        </span>
        <span className={classes.couponLabel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
          {t('Verified')}
        </span>

        {editButton}
      </div>

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
