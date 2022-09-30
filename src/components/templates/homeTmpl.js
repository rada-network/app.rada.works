/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import List from '../organisms/Campaign/List';
import Hero from '../organisms/Hero';

const HomeTmpl = (props) => {
  return (
    <Fragment>
      <MainTmpl>
        <Hero />

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
              <h3 className="bg-indigo-50 text-indigo-600 inline-block text-sm rounded-full py-1 px-3 mx-auto mt-0 mb-3">
                SoulMint
              </h3>
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

        {/* SoulMint News */}
        <div className="py-20">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="mb-14 text-center">
              <h3 className="bg-indigo-50 text-indigo-600 inline-block text-sm rounded-full py-1 px-3 mx-auto mt-0 mb-3">
                SoulMint News
              </h3>
              <h2 className="text-center text-3xl md:text-4xl lg:text-4xl font-semibold text-gray-800 dark:text-white mt-0 mb-0 tracking-tighter">
                Related Articles
              </h2>
            </div>

            <div className="flex flex-wrap md:flex-nowrap items-stretch gap-8">
              <div className="basis-full md:basis-1/3">
                <div className="h-56 overflow-hidden rounded-lg mb-4">
                  <img src="/samples/news-1.jpg" alt="Sample image" />
                </div>

                <h3 className="mt-0 mb-2 text-gray-800 text-lg">
                  <a
                    href="#"
                    title="Sample link"
                    className="hover:text-indigo-600 transition-all duration-300"
                  >
                    ConsenSys Provides Web3 Dev Stack to StarkWare as
                    Partnership Expands
                  </a>
                </h3>

                <div className="text-sm mb-4">
                  <span className="font-semibold mr-2">SoulMint</span>
                  <date>Oct 01, 2022</date>
                </div>

                <p className="my-0">
                  ConsenSys and StarkWare have expanded their partnership to
                  include ConsenSys Diligence smart contract auditing, providing
                  a one-stop-shop for Web3 development.
                </p>
              </div>
              {/* // News item */}

              <div className="basis-full md:basis-1/3">
                <div className="h-56 overflow-hidden rounded-lg mb-4">
                  <img src="/samples/news-2.jpg" alt="Sample image" />
                </div>

                <h3 className="mt-0 mb-2 text-gray-800 text-lg">
                  <a
                    href="#"
                    title="Sample link"
                    className="hover:text-indigo-600 transition-all duration-300"
                  >
                    How and Why are MetaMask Users Losing their Funds due to
                    Phishing Incidents?
                  </a>
                </h3>

                <div className="text-sm mb-4">
                  <span className="font-semibold mr-2">SoulMint</span>
                  <date>Oct 01, 2022</date>
                </div>

                <p className="my-0">
                  ConsenSys and StarkWare have expanded their partnership to
                  include ConsenSys Diligence smart contract auditing, providing
                  a one-stop-shop for Web3 development.
                </p>
              </div>
              {/* // News item */}

              <div className="basis-full md:basis-1/3">
                <div className="h-56 overflow-hidden rounded-lg mb-4">
                  <img src="/samples/news-4.png" alt="Sample image" />
                </div>

                <h3 className="mt-0 mb-2 text-gray-800 text-lg overflow-hidden ellipsis">
                  <a
                    href="#"
                    title="Sample link"
                    className="hover:text-indigo-600 transition-all duration-300"
                  >
                    MetaMask Se Integra Ao Sistema Brasileiro De Pagamentos Via
                    Pix Para Compras Instantâneas De Criptomoedas
                  </a>
                </h3>

                <div className="text-sm mb-4">
                  <span className="font-semibold mr-2">SoulMint</span>
                  <date>Sep 10, 2022</date>
                </div>

                <p className="my-0">
                  ConsenSys and StarkWare have expanded their partnership to
                  include ConsenSys Diligence smart contract auditing, providing
                  a one-stop-shop for Web3 development.
                </p>
              </div>
              {/* // News item */}
            </div>
          </div>
        </div>
        {/* // SoulMint News */}
      </MainTmpl>
    </Fragment>
  );
};

HomeTmpl.propTypes = {};

export default HomeTmpl;
