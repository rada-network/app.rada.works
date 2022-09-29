/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import List from '../organisms/Campaign/List';

const HomeTmpl = (props) => {
  return (
    <Fragment>
      <MainTmpl>
        {/* Hero */}
        <div className="background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%); bg-opacity-60">
          <div className="container max-w-screen-xl mx-auto px-4 lg:px-4">
            <div className="flex flex-wrap items-center py-16">
              <div className="basis-full lg:basis-7/12 text-center lg:text-left pr-4">
                <h1 className="my-0 text-4xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-relaxed">
                  SoulMint
                  <span className="block font-light">
                    the reward-focused platform for verifiable credentials
                  </span>
                </h1>
                <p className="text-xl">
                  Build your Web3 reputation through your SoulBound tokens.
                  Explore and earn special rewards, curated by us.
                </p>

                <div className="mt-8">
                  <a
                    href="#"
                    title="View more"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 inline-flex items-center justify-center transition-all duration-300 w-44"
                  >
                    Learn more
                    <svg
                      className="h-4 w-4 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="hidden lg:flex justify-end basis-5/12 text-right pl-4">
                <img src="hero-1.png" alt="Hero decor" />
              </div>
            </div>
          </div>
        </div>
        {/* // Hero */}

        <List position="home-page" />

        {/* SoulMint Features */}
        <div className="bg-white">
          <div className="container max-w-screen-xl mx-auto py-20">
            <div className="mb-16 text-center">
              <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white mt-0 mb-0 tracking-tighter">
                SoulMint Features
              </h2>
            </div>

            <div className="flex items-start">
              <div className="basis-1/4 text-center">
                <h3 className="my-0 text-2xl text-gray-800 mb-4">
                  Incentivized participation
                </h3>
                <p className="my-0">
                  Users earn rewards by completing tasks. No extra steps, no KYC
                </p>
              </div>

              <div className="basis-1/4 text-center">
                <h3 className="my-0 text-2xl text-gray-800 mb-4">
                  Chain-agnostic
                </h3>
                <p className="my-0">
                  No more pain switching between chains. One profile with
                  verified identity can enjoy perks on any chain.
                </p>
              </div>

              <div className="basis-1/4 text-center">
                <h3 className="my-0 text-2xl text-gray-800 mb-4">
                  Rewards, aggregated
                </h3>
                <p className="my-0">
                  Verified Souls get privileged access to various allow-lists,
                  all in one place.
                </p>
              </div>

              <div className="basis-1/4 text-center">
                <h3 className="my-0 text-2xl text-gray-800 mb-4">
                  No-code campaign creator tool
                </h3>
                <p className="my-0">
                  Projects can freely apply to create a campaign and reward
                  users via SoulBound tokens.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* // SoulMint Features */}

        {/* SoulMint How it work */}
        <div className="bg-gray-50 dark:bg-gray-800">
          <div className="container max-w-screen-xl mx-auto py-20">
            <div className="mb-16 text-center">
              <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white mt-0 mb-0 tracking-tighter">
                How it works
              </h2>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center text-center px-4 basis-1/4">
                <span className="bg-gray-200 flex items-center justify-center h-14 w-14 rounded-full font-bold mb-4">
                  1
                </span>
                <h4 className="font-semibold text-base">Connect wallet</h4>
              </div>

              <div className="flex flex-col items-center text-center px-4 basis-1/4">
                <span className="bg-gray-200 flex items-center justify-center h-14 w-14 rounded-full font-bold mb-4">
                  2
                </span>
                <h4 className="font-semibold text-base">
                  Browse available campaigns
                </h4>
              </div>

              <div className="flex flex-col items-center text-center px-4 basis-1/4">
                <span className="bg-gray-200 flex items-center justify-center h-14 w-14 rounded-full font-bold mb-4">
                  3
                </span>
                <h4 className="font-semibold text-base">
                  Complete tasks and receive rewards
                </h4>
              </div>

              <div className="flex flex-col items-center text-center px-4 basis-1/4">
                <span className="bg-gray-200 flex items-center justify-center h-14 w-14 rounded-full font-bold mb-4">
                  4
                </span>
                <h4 className="font-semibold text-base">
                  Manage your profile & view achievements
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* // SoulMint How it work */}

        {/* FAQs */}
        <div className="py-20">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="mb-14">
              <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white mt-0 mb-0 tracking-tighter">
                SoulMint news
              </h2>
            </div>
          </div>
        </div>
        {/* // FAQs */}
      </MainTmpl>
    </Fragment>
  );
};

HomeTmpl.propTypes = {};

export default HomeTmpl;
