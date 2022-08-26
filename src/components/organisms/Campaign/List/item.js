import React, { Fragment } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import slugify from 'slugify';
import { shape, string, number } from 'prop-types';
import classes from './item.module.css';

const Item = (props) => {
  const { data } = props;

  const handleClick = () => {
    const path = `/campaign-details/${slugify(data.title).toLowerCase()}`;
    Router.push(path);
  };

  return (
    <div className={`${classes.root}`}>
      <div className={classes.itemHead}>
        <span className={classes.couponAmoun}>35% Off</span>
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
          Verified
        </span>
      </div>

      <div className={classes.itemBody}>
        30% Off Rare Hinata Wizard Nft. Exclusions: Code Automatically Applied
        at Checkout.
      </div>

      <div className={classes.itemFoot}>
        <small>Move JoomlArt Coupon code</small>
        <a href="#" title="Get Coupon" className={classes.getCoupon}>
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
