import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './related.module.css';
import { useStyle } from '../../../classify';

const Related = (props) => {
  const { classes: propClasses } = props;
  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('common');

  const child = (
    <div className={classes.Box}>
      <h3 className={classes.boxTitle}>{t('Other campaigns')}</h3>
      <div className={classes.boxBody}>
        <ul className={classes.couponList}>
          <li>
            <div className={classes.couponItem}>
              <h4>50% Off all NFT items</h4>
              <div className={classes.itemMeta}>
                <span>Aug, 08 2022 - Sep, 08 2022</span>
              </div>
              <a className={classes.btnGetCoupon} href="#" title="Get coupon">
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
              <a className={classes.btnGetCoupon} href="#" title="Get coupon">
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
              <a className={classes.btnGetCoupon} href="#" title="Get coupon">
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
              <a className={classes.btnGetCoupon} href="#" title="Get coupon">
                Get coupon
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

  return <Fragment>{child}</Fragment>;
};

Related.propTypes = {
  classes: shape({
    root: string
  })
};

export default Related;
