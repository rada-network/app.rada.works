import React from 'react';
import { shape, string, number } from 'prop-types';
import { useTranslation } from 'next-i18next';
import defaultClasses from './howClaim.module.css';
import { useStyle } from '../../../../../classify';

const HowClaim = (props) => {
  const { classes: propClasses } = props;
  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('campaign_details');

  return (
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
        <div className={`${classes.howtoSteps} flex flex-col mb-8 relative`}>
          <div className="flex items-center mb-8 z-10">
            <strong className="bg-blue-100 border border-4 border-white text-blue-500 flex items-center justify-center h-11 w-11 rounded-full">
              1
            </strong>
            <div className="flex-1 pl-4">
              Connect wallet majority have suffered alteration in some form
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
  );
};

HowClaim.propTypes = {
  classes: shape({
    root: string
  }),
  campaign: shape({
    id: number
  })
};

export default HowClaim;
