import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Moment from 'moment';
import Button from '../../../atoms/Button';
import TextLink from '../../../atoms/TextLink';
import Related from '../Related';
import Subcribe from '../Subcribe';
import { useSession } from 'next-auth/react';
import { useDetails } from '../../../../hooks/Campaign';
import classes from './detail.module.css';
import { ellipsify } from '../../../../utils/strUtils';
import Router from 'next/router';

const Details = (props) => {
  const { slug } = props;

  const { t } = useTranslation('campaign_details');

  Moment.locale('en');

  const { status, data: session } = useSession();

  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState();

  useEffect(() => {
    resolvedTheme === 'light' ? setIsDark(false) : setIsDark(true);
  }, [resolvedTheme]);

  const rootClassName = isDark ? 'rootDark' : 'root';

  const { loading, data, error, handleViewCoupons } = useDetails({
    slug: { _eq: slug } ?? ''
  });

  const viewCoupons = async (campaign) => {
    const couponContainer = document.getElementById('coupon-codes');
    if (!couponContainer.innerText.length) {
      const codes = await handleViewCoupons({
        nftCollections: campaign.nft_collection_ids,
        accountAdd: session.user.email,
        isCampaignOwner: session.id == campaign.user_created.id ? true : false
      });

      const couponCodes = document.createElement('span');
      couponCodes.className = classes.couponCodes;
      const txtCodes = document.createTextNode(codes);
      couponCodes.appendChild(txtCodes);
      couponContainer.appendChild(couponCodes);

      document.getElementById('get-coupon-code-btn').remove();
    }
  };

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
    if (data.campaign) {
      const campaign = data.campaign[0];

      // Build NFT collection information
      const nftCollectionInfo = campaign.nft_collection_ids.length
        ? campaign.nft_collection_ids.map((nftCollection, index) => (
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

      let viewCouponCodesArea = null;
      if (status === 'loading') {
        viewCouponCodesArea = t('Loading...');
      } else if (status === 'authenticated') {
        viewCouponCodesArea = (
          <Fragment>
            <div className="flex">
              <Button
                id={`get-coupon-code-btn`}
                priority="high"
                type="button"
                onPress={() => viewCoupons(campaign)}
              >
                {t('Verify and get coupon codes')}
              </Button>
              <div className={classes.couponContainer} id={`coupon-codes`} />
            </div>
          </Fragment>
        );
      } else {
        viewCouponCodesArea = (
          <div className={classes.couponNotes}>
            <svg
              className="w-4 h-4 fill-orange-400 dark:fill-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
            {t('You must do authentication before to view coupon codes.')}
          </div>
        );
      }

      // Build edit button for owner of campaign
      const handleEdit = () => {
        const path = `/edit-campaign/${campaign.id}`;
        Router.push(path);
      };
      const currentUserId = session && session.id ? session.id : null;
      const editButton =
        campaign.user_created.id === currentUserId ? (
          <Button priority="normal" type="button" onPress={handleEdit}>
            {t('Edit')}
          </Button>
        ) : null;

      // Build store info
      const storeLogo = campaign.store_logo_url ? (
        <img
          className={`${classes.storeLogo}`}
          src={campaign.store_logo_url}
          alt={`cover_${campaign.store_name}`}
        />
      ) : null;
      const storeInfo = campaign.store_url ? (
        <TextLink
          className={classes.storeLink}
          target={`_blank`}
          href={campaign.store_url}
        >
          {storeLogo}
          <span className={classes.storeName}> {campaign.store_name} </span>
        </TextLink>
      ) : (
        <span className={classes.storeName}> {campaign.store_name} </span>
      );

      child = (
        <div className={classes.pageWrap}>
          <div className={classes.pageContent}>
            <h1 className={classes.pageTitle}>{campaign.title}</h1>

            <div className="flex items-stretch">
              <div className="">
                <div
                  className={classes.desc}
                  dangerouslySetInnerHTML={{ __html: campaign.description }}
                />
              </div>{' '}
              {/* // Description */}
            </div>
          </div>
        </div>
      );
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
