import React, { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Moment from 'moment';
import Button from '../../../atoms/Button';
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
        isOwner: session.id == campaign.user_created.id ? true : false
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
            <div className={classes.boxHilite}>
              <h3 className={classes.boxTitle}>About Campaign</h3>
              <div className={classes.boxBody}>
                <p className="my-0">
                  Mauris eget finibus justo. Aenean aliquam, diam ut elementum
                  vestibulum, ante dolor porttitor urna, id consequat velit
                  nulla in leo. Vestibulum sit amet neque a mi pulvinar dapibus
                  quis eu ante.
                </p>

                <div className="mt-3">
                  <a
                    href="#"
                    title="More information"
                    className="border-b border-dotted border-violet-600 text-violet-600 text-base dark:hover:text-violet-500"
                  >
                    View full...
                  </a>
                </div>
              </div>
            </div>
            <div className={classes.Box}>
              <h3 className={classes.boxTitle}>Other campaigns</h3>
              <div className={classes.boxBody}>
                <ul className={classes.couponList}>
                  <li>
                    <div className={classes.couponItem}>
                      <h4>50% Off all NFT items</h4>
                      <div className={classes.itemMeta}>
                        <span>Aug, 08 2022 - Sep, 08 2022</span>
                      </div>
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
                      <div className={classes.itemMeta}>
                        <span>Aug, 08 2022 - Sep, 08 2022</span>
                      </div>
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
                      <div className={classes.itemMeta}>
                        <span>Aug, 08 2022 - Sep, 08 2022</span>
                      </div>
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
                      <div className={classes.itemMeta}>
                        <span>Aug, 08 2022 - Sep, 08 2022</span>
                      </div>
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
            </div>{' '}
            {/* End: Box  */}
            <div className="bg-orange-50 border border-2 border-dashed border-orange-200 rounded-lg mt-6">
              <div className={classes.boxBody}>
                <h3 className="dark:text-gray-700 m-0 mb-4">
                  Get Notification
                </h3>
                <p className="dark:text-gray-700 my-0">
                  Get the latest update notification from Aenean lacinia
                  pellentesque finibus.
                </p>
                <form>
                  <div className="flex items-center mt-4">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="border border-1 border-gray-200 focus:border-violet-600 focus:shadow-none text-gray-700 rounded py-2 px-3 flex-1 w-auto min-w-0"
                    />
                    <btn
                      type="button"
                      action="submit"
                      className="bg-violet-600 hover:bg-violet-700 border-0 text-white rounded py-2 px-3 ml-2 transition transition-2 cursor-pointer"
                    >
                      Subscribe
                    </btn>
                  </div>
                </form>
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
