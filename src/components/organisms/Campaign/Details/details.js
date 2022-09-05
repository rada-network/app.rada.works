import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Moment from 'moment';
import Button from '../../../atoms/Button';
import Related from '../Related';
import Subcribe from '../Subcribe';
import { useSession } from 'next-auth/react';
import { useDetails } from '../../../../hooks/Campaign';
import classes from './detail.module.css';

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
        chainName: campaign.nft_collection_id.chain_name,
        contractAdd: campaign.nft_collection_id.contract_address,
        accountAdd: session.user.email,
        isCampaignOwner: session.id == campaign.user_created.id ? true : false
      });
      console.log('codes:', codes);

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
      child = <div>{t('Loading...')}</div>;
    }
  } else {
    if (data.campaign) {
      const campaign = data.campaign[0];

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
                onClick={() => viewCoupons(campaign)}
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
              className="w-4 h-4 fill-amber-600 dark:fill-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
            {t('You must do authentication before to view coupon codes.')}
          </div>
        );
      }

      child = (
        <div className={classes.pageWrap}>
          <div className={classes.pageContent}>
            <h1 className={classes.pageTitle}>{campaign.title}</h1>

            <div className="flex items-stretch shadow-md rounded-lg p-6 mb-12">
              <div className="flex flex-col items-center justify-center border-r border-r-2 border-dashed border-gray-200 pr-8">
                <strong className="text-6xl">
                  {campaign.discount_value}
                  <span className="leading-none">%</span>
                </strong>
                <span className="block text-center uppercase tracking-widest">
                  Discount
                </span>
              </div>
              <div className="pl-8 w-full">
                <div className="border-b border-gray-100 mb-5 pb-5">
                  <ul className="flex flex-wrap list-none m-0 p-0">
                    <li className="flex items-center w-1/2 m-0 mb-3 p-0">
                      <span className="flex text-gray-500 items-center mr-2">
                        <svg
                          className="w-4 h-4 fill-gray-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        Date start
                      </span>
                      {Moment(campaign.date_start).format('DD MMM YYYY')}
                    </li>

                    <li className="flex items-center w-1/2 m-0 mb-3 p-0">
                      <span className="flex items-center text-gray-500 mr-2">
                        <svg
                          className="w-4 h-4 fill-gray-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        Date end
                      </span>
                      {campaign.date_end
                        ? Moment(campaign.date_end).format('DD MMM YYYY')
                        : 'N/A'}
                    </li>
                    <li className="w-1/2 m-0 p-0">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 fill-gray-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                        </svg>
                        {campaign.store_url}
                      </span>
                    </li>
                    <li className={classes.nftInfo}>
                      <span
                        className={`${classes.chainName} ${campaign.nft_collection_id.chain_name}`}
                      >
                        {campaign.nft_collection_id.chain_name}
                      </span>
                      <span className={classes.contractAdd}>
                        {campaign.nft_collection_id.contract_address}
                      </span>
                    </li>
                  </ul>
                </div>
                {viewCouponCodesArea}
              </div>
            </div>

            <div
              className={classes.desc}
              dangerouslySetInnerHTML={{ __html: campaign.description }}
            />
          </div>

          <div className={classes.pageSidebar}>
            <Related currentCampaign={campaign} />
            <Subcribe />
          </div>
        </div>
      );
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
