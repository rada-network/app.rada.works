import React from 'react';
import { shape, string } from 'prop-types';
// import { useTranslation } from 'next-i18next';
import TextLink from '../../../../../atoms/TextLink';
import { ellipsify } from '../../../../../../utils/strUtils';
import defaultClasses from './quest.module.css';
import { useStyle } from '../../../../../classify';

const Quest = (props) => {
  const { classes: propClasses, campaign } = props;
  const classes = useStyle(defaultClasses, propClasses);

  // const { t } = useTranslation('campaign_details');

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

  return (
    <div className="bg-white shadow-sm rounded-lg mb-6">
      <div className="border-b border-gray-200 border-opacity-60 py-3 px-4">
        <h3 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
          Require Tasks
        </h3>
        <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
          Follow the steps below to add yourself to this list.
        </p>
      </div>

      <div className="p-4">
        <div className="flex items-center text-md font-semibold mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="#5AC8FA"
            viewBox="0 0 16 16"
          >
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
          </svg>
          Twitter
          {/*<span className="border border-2 border-sky-400 text-sky-500 flex items-center text-sm font-medium rounded-full py-1.5 pl-3 pr-4 ml-auto transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1"
              fill="#38bdf8"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
            Login
          </span>*/}
          <a
            href="#"
            title="Login"
            className="bg-sky-400 hover:bg-sky-500 text-white flex items-center text-sm font-medium rounded-full py-1.5 pl-3 pr-4 ml-2 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1"
              fill="#fff"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
            Login
          </a>
        </div>

        <a
          href=""
          title="@joomlart"
          className="bg-gray-50 text-sm font-medium flex items-center border border-red-500 hover:border-red-500 rounded-lg py-3 px-4 hover:shadow-sm transition-all duration-300 mb-3"
        >
          Follow{' '}
          <strong className="text-blue-600 font-semibold">@joomlart</strong> on
          Twitter
          <span className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#dc2626"
              className="bi bi-exclamation-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </span>
        </a>
        <small className="-mt-2 mb-3 block text-red-600 text-xs">
          Please try again...
        </small>

        <a
          href=""
          title="@joomlart"
          className="bg-gray-50 text-sm font-medium flex items-center border border-gray-200 hover:border-blue-600 rounded-lg py-3 px-4 hover:shadow-sm transition-all duration-300"
        >
          Must&nbsp;<strong>Retweet</strong>&nbsp;this tweet
          <span className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#16a34a"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </span>
        </a>
      </div>

      <h3 className="mt-0 mb-0 leading-normal text-xl font-bold text-gray-800">
        NFT Ownership required
      </h3>
      <p className="text-sm text-gray-500 font-normal mt-0 mb-0">
        You must be holder of one NFT in the following NFT collection
      </p>
      <div className="p-4"> {nftCollectionInfo} </div>
    </div>
  );
};

Quest.propTypes = {
  classes: shape({
    root: string
  }),
  campaign: shape({
    id: string
  })
};

export default Quest;
