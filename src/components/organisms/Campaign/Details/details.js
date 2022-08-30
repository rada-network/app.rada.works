import React from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Moment from 'moment';
import { useDetails } from '../../../../hooks/Campaign';
import classes from './detail.module.css';

const Details = (props) => {
  const { slug } = props;

  const { t } = useTranslation('campaign_details');

  Moment.locale('en');

  const { theme } = useTheme();
  const rootClassName = theme === 'dark' ? 'rootDark' : 'root';

  const { loading, data, error, handleViewCoupons } = useDetails({
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
      child = <div>{t('Loading...')}</div>;
    }
  } else {
    if (data.campaign) {
      const campaign = data.campaign[0];
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
            <div
              className={classes.desc}
              dangerouslySetInnerHTML={{ __html: campaign.description }}
            />
          </div>

          <div className={classes.pageSidebar}>
            <div className={classes.Box}>
              <h3 className={classes.boxTitle}>Other coupons</h3>
              <div className={classes.boxBody}>
                <ul className={classes.couponList}>
                  <li>
                    <div className={classes.couponItem}>
                      <h4>50% Off all NFT items</h4>
                      <a
                        className={classes.btnGetCoupon}
                        href="#"
                        title="Get coupon"
                      >
                        Get coupon
                      </a>
                    </div>
                  </li>

                  <li>
                    <div className={classes.couponItem}>
                      <h4>30% Off all NFT items</h4>
                      <a
                        className={classes.btnGetCoupon}
                        href="#"
                        title="Get coupon"
                      >
                        Get coupon
                      </a>
                    </div>
                  </li>

                  <li>
                    <div className={classes.couponItem}>
                      <h4>25% Off all NFT items</h4>
                      <a
                        className={classes.btnGetCoupon}
                        href="#"
                        title="Get coupon"
                      >
                        Get coupon
                      </a>
                    </div>
                  </li>

                  <li>
                    <div className={classes.couponItem}>
                      <h4>75% Off all NFT items</h4>
                      <a
                        className={classes.btnGetCoupon}
                        href="#"
                        title="Get coupon"
                      >
                        Get coupon
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
