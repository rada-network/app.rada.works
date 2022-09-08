import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Moment from 'moment';
// import Related from '../Related'; coming soon
import Subcribe from '../../Subcribe';
import { useDetails } from '../../../../../hooks/Campaign/NftCollection';
import classes from './detail.module.css';

const Details = (props) => {
  const { slug } = props;

  const { t } = useTranslation('nft_collection_details');

  Moment.locale('en');

  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState();
  useEffect(() => {
    resolvedTheme === 'light' ? setIsDark(false) : setIsDark(true);
  }, [resolvedTheme]);

  const rootClassName = isDark ? 'rootDark' : 'root';

  const { loading, data, error } = useDetails({
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
    if (data.nft_collection) {
      const nftCollection = data.nft_collection[0];
      child = (
        <div className={classes.pageWrap}>
          {/* Collection information */}
          <div className="bg-gray-100 dark:bg-gray-900 bg-[url('/collection/collection-cover.png')] bg-cover">
            <div className="py-24 mx-auto max-w-screen-xl relative">
              <h1 className="font-semibold text-center text-white text-5xl">
                {nftCollection.name}
              </h1>
              <a
                href="#"
                title="{nftCollection.name}"
                className="shadow-md border border-4 border-white block h-20 w-20 rounded-full overflow-hidden absolute -bottom-8 left-1/2 -mx-10"
              >
                <img src="/collection/collection-avt.png" alt="" />
              </a>
            </div>
          </div>

          <div className="text-center mt-12 text-2xl font-semibold">
            {nftCollection.contract_address}
          </div>

          <div className="flex items-center justify-center mt-8">
            <div className="text-center mr-6">
              <strong className="block font-bold text-2xl">10.0K</strong>
              <span className="text-gray-500">items</span>
            </div>

            <div className="text-center ml-4 mr-6">
              <strong className="block font-bold text-2xl">2.3K</strong>
              <span className="text-gray-500">Owners</span>
            </div>

            <div className="text-center ml-4 mr-6">
              <strong className="block font-bold text-2xl">267.2K</strong>
              <span className="text-gray-500">Total valume</span>
            </div>

            <div className="text-center ml-6">
              <strong className="block font-bold text-2xl">81</strong>
              <span className="text-gray-500">Floor price</span>
            </div>
          </div>

          {/* Collection information */}

          <div className={classes.pageContent}>
            {/*for examples to show sub info */}
            {/* <div>Chain: {nftCollection.chain_name}</div> */}

            {/* // NFT List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-1.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #1
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-2.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #2
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-3.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #3
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-4.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #4
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-5.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #5
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-6.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #6
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-7.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #7
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-8.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #8
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-9.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #9
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-10.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #10
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-11.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #11
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg shadow-sm hover:shadow-md pb-4 transition duration-300">
                <div className="rounded-t-lg mb-4 -mt-px -ml-px -mr-px overflow-hidden">
                  <img src="/collection/quark/quark-12.png" alt="Quark" />
                </div>
                <h3 className="text-lg my-0 px-4 uppercase mb-2">
                  Quark Ape Club #12
                </h3>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-3 h-3 mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    152
                  </div>
                </div>
              </div>
            </div>
            {/* // NFT List */}
          </div>
        </div>
      );
    }
  }

  return <div className={`${classes[rootClassName]}`}>{child}</div>;
};

export default Details;
