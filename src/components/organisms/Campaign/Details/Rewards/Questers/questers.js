import React from 'react';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './questers.module.css';
import { useStyle } from '../../../../../classify';

const Questers = (props) => {
  const { classes: propClasses } = props;
  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('campaign_details');

  return (
    <div className="bg-white shadow-sm rounded-lg mb-6 mt-10">
      <div className="border-b border-gray-200 border-opacity-60 py-3 px-4">
        <h3 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
          Questers (8077)
        </h3>
        {/*<p className="text-sm text-gray-500 font-normal mt-0 mb-0">
          Follow the steps below to claim your tocken.
        </p>*/}
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
  );
};

Questers.propTypes = {
  classes: shape({
    root: string
  }),
  campaign: shape({
    id: string
  })
};

export default Questers;
