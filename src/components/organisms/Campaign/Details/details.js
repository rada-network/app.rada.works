import React, { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Moment from 'moment';
import Button from '../../../atoms/Button';
import Overview from '../Overview';
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

  const { theme } = useTheme();
  const rootClassName = theme === 'dark' ? 'rootDark' : 'root';

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
            <Button
              id={`get-coupon-code-btn`}
              priority="high"
              type="button"
              onClick={() => viewCoupons(campaign)}
            >
              {t('Verify and get coupon codes')}
            </Button>
            <div className={classes.couponContainer} id={`coupon-codes`} />
          </Fragment>
        );
      } else {
        viewCouponCodesArea = (
          <div className={classes.couponNotes}>
            {t('You must do authentication before to view coupon codes.')}
          </div>
        );
      }

      child = (
        <div className={classes.pageWrap}>
          <div className={classes.pageContent}>
            <h1 className={classes.pageTitle}>{campaign.title}</h1>
            <div className={classes.campaignMeta}>
              <div className={classes.dateStart}>
                <span className={classes.dateLabel}>Date start</span>
                <span>{Moment(campaign.date_start).format('DD MMM YYYY')}</span>
              </div>

              <div className={classes.dateEnd}>
                <span className={classes.dateLabel}>Date end</span>
                <span>
                  {campaign.date_end
                    ? Moment(campaign.date_end).format('DD MMM YYYY')
                    : 'N/A'}
                </span>
              </div>
            </div>

            <div className={classes.getCoupon}>{viewCouponCodesArea}</div>

            <div
              className={classes.desc}
              dangerouslySetInnerHTML={{ __html: campaign.description }}
            />
          </div>

          <div className={classes.pageSidebar}>
            <Overview />
            <Related />
            <Subcribe />
          </div>
        </div>
      );
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
