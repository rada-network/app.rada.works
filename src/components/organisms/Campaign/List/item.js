import React from 'react';
import Router from 'next/router';
import slugify from 'slugify';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import { toHTML, subStrWords } from '../../../../utils/strUtils';
import classes from './item.module.css';

const DESC_MAX_LENGTH = 200;

const Item = (props) => {
  const { data } = props;

  const { t } = useTranslation('list_campaign');

  const viewDetails = () => {
    const path = `/campaign-details/${slugify(data.title).toLowerCase()}`;
    Router.push(path);
  };

  return (
    <div className={`${classes.root}`}>
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
      </div>

      <div
        className={classes.itemBody}
        dangerouslySetInnerHTML={toHTML(
          subStrWords(data?.description, DESC_MAX_LENGTH)
        )}
      />

      <div className={classes.itemFoot}>
        <small>Move JoomlArt Coupon code</small>
        <a
          href="javascript:void(0);"
          onClick={viewDetails}
          title="Get Coupon"
          className={classes.getCoupon}
        >
          Get this deal
        </a>
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
