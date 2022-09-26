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
          {/* <span className={classes.storeName}> {campaign.store_name} </span> */}
        </TextLink>
      ) : (
        <span className={classes.storeName}> {campaign.store_name} </span>
      );

      child = (
        <div className="bg-gray-50">
          <div className="container mx-auto max-w-screen-xl flex items-stretch px-4 py-12 gap-8">
            <div className="bg-white shadow-sm rounded-xl p-10 basis-full md:basis-2/3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mt-0 mb-2 lg:mb-8 leading-relaxed">
                {campaign.title}
              </h1>

              <div
                className={classes.desc}
                dangerouslySetInnerHTML={{ __html: campaign.description }}
              />
            </div>
            {/* // Description */}

            <div className="basis-full basis-1/3">
              <div className="bg-white shadow-sm rounded-xl p-4 pt-0 mb-6">
                <div className="border-b border-gray-200 border-opacity-60 -ml-4 -mr-4 p-4">
                  <h2 className="mt-0 mb-0 leading-normal text-2xl font-bold text-gray-800">
                    Register
                  </h2>
                  <p className="text-sm text-gray-500 font-normal mt-0 mb-6">
                    Follow the steps below to add yourself to this list.
                  </p>
                  <div className="">
                    <a
                      href="#"
                      title="Login to Register"
                      className="block bg-green-600 hover:bg-green-700 text-white py-3 px-4 text-center text-lg rounded-lg transition-all duration-300"
                    >
                      Login to Register
                    </a>
                  </div>
                </div>
              </div>

              {/* Coupon code */}
              <div className="bg-white shadow-sm rounded-xl p-4 mb-6" />
              {/* Coupon code */}

              {/* Coupon code */}
              <div className="bg-white shadow-sm rounded-xl">
                <div className="py-6 px-4 text-center">{storeInfo}</div>

                <div className="border-b border-t border-gray-200 border-opacity-60 pt-6 px-4 pb-4 text-center">
                  <div className="flex flex-col mb-6">
                    <strong className="text-5xl font-bold mb-1 text-gray-800">
                      {campaign.discount_value}% Off
                    </strong>
                    <span className="inline-block text-sm text-blue-600 font-medium uppercase tracking-widest">
                      For all products
                    </span>
                  </div>

                  <div className="flex items-center gap-8 mb-4 text-sm text-gray-500">
                    <div className="basis-1/2 text-left">
                      <span className="inline-block mr-1 text-xs uppercase">
                        Start:
                      </span>
                      <date className="text-gray-700 font-medium">
                        {Moment(campaign.date_start).format('DD MMM YYYY')}
                      </date>
                    </div>
                    <div className="basis-1/2 text-right">
                      <span className="inline-block mr-1 text-xs uppercase">
                        End:
                      </span>
                      <date className="text-gray-700 font-medium">
                        {campaign.date_end
                          ? Moment(campaign.date_end).format('DD MMM YYYY')
                          : 'N/A'}
                      </date>
                    </div>
                  </div>

                  <div className="flex flex-wrap">{nftCollectionInfo}</div>
                </div>

                <div className="py-4 px-4">
                  {viewCouponCodesArea}
                  {editButton}
                </div>
              </div>
              {/* Coupon code */}
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
