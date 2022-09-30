import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Moment from 'moment';
import Button from '../../../atoms/Button';
import TextLink from '../../../atoms/TextLink';
// import Image from "../../../atoms/Image";
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
    if (data.campaign.length) {
      const campaign = data.campaign[0];

      // Build NFT collection information
      const nftCollectionInfo =
        campaign &&
        campaign.nft_collection_ids &&
        campaign.nft_collection_ids.length
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
          alt={`${campaign.store_name}`}
        />
      ) : null;
      const storeInfo = campaign.store_url ? (
        <TextLink
          className={classes.storeLink}
          target={`_blank`}
          href={campaign.store_url}
        >
          {storeLogo}
          {/* <span className={classes.storeName}> {campaign.store_name} </span> */}
        </TextLink>
      ) : (
        <span className={classes.storeName}> {campaign.store_name} </span>
      );

      // Build cover and thumb images
      const assetsBaseUrl = process.env.MEDIA_BASE_URL;
      const coverOptions = 'fit=cover';
      const thumbOptions = 'fit=cover';
      const coverImage =
        campaign.cover_image && campaign.cover_image.id ? (
          //Todo: Switching to use NextImage later
          // <Image
          //   className={`${classes.campaignCover}`}
          //   layout="responsive"
          //   width="100%"
          //   height="100%"
          //   src={`${assetBaseUrl}/${campaign.cover_image.id}`}
          //   alt={`cover_${campaign.slug}`}
          // />
          <img
            className={`${classes.campaignCover}`}
            src={`${assetsBaseUrl}/${campaign.cover_image.id}?${coverOptions}`}
            alt={`${campaign.cover_image.title}`}
          />
        ) : null;
      /*const thumbImage =
        campaign.thumb_image && campaign.thumb_image.id ? (
          <img
            className={`${classes.campaignThumb}`}
            src={`${assetsBaseUrl}/${campaign.thumb_image.id}?${thumbOptions}`}
            alt={`${campaign.thumb_image.title}`}
          />
        ) : null;*/

      const shortDesc = campaign.short_desc ? (
        <div
          className={classes.shortDesc}
          dangerouslySetInnerHTML={{ __html: campaign.short_desc }}
        />
      ) : null;

      const description = campaign.description ? (
        <div
          className={classes.desc}
          dangerouslySetInnerHTML={{ __html: campaign.description }}
        />
      ) : null;

      const rewardOverview = campaign.reward_overview ? (
        <div className="bg-orange-50 border border-orange-200 shadow-sm rounded-lg mb-6">
          <div className="p-4">
            <div
              className={classes.rewardOverview}
              dangerouslySetInnerHTML={{ __html: campaign.reward_overview }}
            />
          </div>
        </div>
      ) : null;

      child = (
        <div className="bg-gray-50">
          <div className="container mx-auto max-w-screen-xl flex items-stretch py-12">
            <div className="px-4 basis-full md:basis-2/3">
              <div className="bg-white rounded-lg shadow-sm p-4 pt-0">
                <div className="rounded-t-lg overflow-hidden mb-8 -mx-4">
                  {coverImage}
                </div>

                {/* {thumbImage} */}

                <h1
                  className={`${classes.pageTitle} text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mt-0 mb-2 lg:mb-8`}
                >
                  {campaign.title}
                </h1>

                {/* Campain meta */}
                <div className="border-b border-gray-200 flex items-center justify-start pb-4 gap-6">
                  <div className="bg-green-100 text-green-600 rounded-full py-1 px-3 text-sm font-medium">
                    Ongoing
                  </div>
                  <div>
                    {Moment(campaign.date_start).format('DD MMM YYYY')} -
                    {campaign.date_end
                      ? Moment(campaign.date_end).format('DD MMM YYYY')
                      : 'N/A'}
                  </div>

                  {storeInfo}
                </div>
                {/* // Campain meta */}

                {shortDesc}

                {description}
              </div>
              {/* // Description */}
            </div>

            <div className="basis-1/3 px-4">
              {/* About Reward */}
              {rewardOverview}
              {/* // About Reward */}

              {/* Require Tasks */}
              <div className="bg-white shadow-sm rounded-lg mb-6">
                <div className="border-b border-gray-200 border-opacity-60 py-3 px-4">
                  <h3 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
                    Require Tasks
                  </h3>
                  <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
                    Follow the steps below to add yourself to this list.
                  </p>
                </div>

                <div className="p-4">
                  <div className="flex items-center text-md font-semibold mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2"
                      fill="#5AC8FA"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                    Twitter
                    <span className="border border-2 border-sky-400 text-sky-500 flex items-center text-sm font-medium rounded-full py-1.5 pl-3 pr-4 ml-auto transition duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="#38bdf8"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                      Login
                    </span>
                    <a
                      href="#"
                      title="Login"
                      className="bg-sky-400 hover:bg-sky-500 text-white flex items-center text-sm font-medium rounded-full py-1.5 pl-3 pr-4 ml-2 transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="#fff"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                      Login
                    </a>
                  </div>

                  <a
                    href=""
                    title="@joomlart"
                    className="bg-gray-50 text-sm font-medium flex items-center border border-red-500 hover:border-red-500 rounded-lg py-3 px-4 hover:shadow-sm transition-all duration-300 mb-3"
                  >
                    Follow{' '}
                    <strong className="text-blue-600 font-semibold">
                      @joomlart
                    </strong>{' '}
                    on Twitter
                    <span className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#dc2626"
                        className="bi bi-exclamation-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </span>
                  </a>
                  <small className="-mt-2 mb-3 block text-red-600 text-xs">
                    Please try again...
                  </small>

                  <a
                    href=""
                    title="@joomlart"
                    className="bg-gray-50 text-sm font-medium flex items-center border border-gray-200 hover:border-blue-600 rounded-lg py-3 px-4 hover:shadow-sm transition-all duration-300"
                  >
                    Must&nbsp;<strong>Retweet</strong>&nbsp;this tweet
                    <span className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#16a34a"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>

              {/* How to claim */}
              <div className="bg-white shadow-sm rounded-lg mb-6">
                <div className="border-b border-gray-200 border-opacity-60 py-3 px-4">
                  <h3 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
                    How to claim?
                  </h3>
                  <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
                    Follow the steps below to claim your tocken.
                  </p>
                </div>

                <div className="p-4">
                  <div
                    className={`${classes.howtoSteps} flex flex-col mb-8 relative`}
                  >
                    <div className="flex items-center mb-8 z-10">
                      <strong className="bg-blue-100 border border-4 border-white text-blue-500 flex items-center justify-center h-11 w-11 rounded-full">
                        1
                      </strong>
                      <div className="flex-1 pl-4">
                        Connect wallet majority have suffered alteration in some
                        form
                      </div>
                    </div>

                    <div className="flex items-center mb-8 z-10">
                      <strong className="bg-blue-100 border border-4 border-white text-blue-500 flex items-center justify-center h-11 w-11 rounded-full">
                        2
                      </strong>
                      <div className="flex-1 pl-4">
                        Majority have suffered alteration in some form
                      </div>
                    </div>

                    <div className="flex items-center z-10">
                      <strong className="bg-blue-100 border border-4 border-white text-blue-500 flex items-center justify-center h-11 w-11 rounded-full">
                        3
                      </strong>
                      <div className="flex-1 pl-4">
                        The majority have suffered alteration in some form
                      </div>
                    </div>
                  </div>

                  <div>
                    <a
                      href="#"
                      title="Claim"
                      className="bg-blue-500 hover:bg-blue-600 text-white block py-2.5 px-4 text-center rounded-lg transition-all duration-300"
                    >
                      Claim tocken
                    </a>
                  </div>
                </div>
              </div>
              {/* // How to claim */}

              {/* Quester */}
              <div className="bg-white shadow-sm rounded-lg mb-6">
                <div className="border-b border-gray-200 border-opacity-60 py-3 px-4">
                  <h3 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
                    Questers (8077)
                  </h3>
                  <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
                    Follow the steps below to claim your tocken.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between py-6 px-4 gap-3">
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-gray-100 text-gray-600`}
                  >
                    Q
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-blue-100 text-blue-600`}
                  >
                    T
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-cyan-100 text-cyan-600`}
                  >
                    K
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-gray-100 text-gray-600`}
                  >
                    H
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-gray-100 text-gray-600`}
                  >
                    M
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-sky-100 text-sky-600`}
                  >
                    K
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-sky-100 text-sky-600`}
                  >
                    V
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-violet-100 text-violet-600`}
                  >
                    M
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-sky-100 text-sky-600`}
                  >
                    L
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-pink-100 text-pink-600`}
                  >
                    N
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-sky-100 text-sky-600`}
                  >
                    S
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-sky-100 text-sky-600`}
                  >
                    K
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-red-100 text-red-600`}
                  >
                    W
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-sky-100 text-sky-600`}
                  >
                    K
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-blue-100 text-blue-600`}
                  >
                    F
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-green-100 text-green-600`}
                  >
                    K
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-sky-100 text-sky-600`}
                  >
                    K
                  </a>
                  <a
                    href="#"
                    title="Quynh"
                    className={`${classes.questerAvt} bg-gray-100 text-gray-600`}
                  >
                    ...
                  </a>
                </div>
              </div>
              {/* // Quester */}

              {/* Coupon code
              <div className="bg-white shadow-sm rounded-xl">
                <div className="border-b border-t border-gray-200 border-opacity-60 pt-6 px-4 pb-4 text-center">
                  <div className="flex flex-col mb-6">
                    <strong className="text-5xl font-bold mb-1 text-gray-800">
                      {campaign.discount_value}% Off
                    </strong>
                  </div>

                  <div className="flex flex-wrap">{nftCollectionInfo}</div>
                </div>

                <div className="py-4 px-4">
                  {viewCouponCodesArea}
                  {editButton}
                </div>
              </div>
              Coupon code */}
            </div>
          </div>
        </div>
      );
    } else {
      child = t('Not Found.');
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
