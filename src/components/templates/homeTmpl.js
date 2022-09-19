/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import MainTmpl from './_mainTmpl';
import List from '../organisms/Campaign/List';

const HomeTmpl = (props) => {
  return (
    <Fragment>
      <MainTmpl>
        {/* Hero */}
        <div className="bg-gray-100">
          <div className="container max-w-screen-xl mx-auto px-4 lg:px-0">
            <div className="flex flex-wrap items-center py-16">
              <div className="basis-full lg:basis-2/5 lg:pr-20 text-center lg:text-left">
                <h1 className="my-0 text-4xl lg:text-6xl font-semibold text-gray-800 leading-relaxed">
                  A multichain NFT design flatform
                </h1>
                <p className="text-lg">
                  Morbi eros tortor, bibendum in erat non, pretium efficitur
                  felis. Sed id enim ut arcu molestie aliquet. Cras ac metus ac
                  enim dapibus feugiat vitae ac orci. Nullam neque ipsum,
                  iaculis in tincidunt quis, egestas id arcu.
                </p>

                <div className="mt-8">
                  <a
                    href="#"
                    title="View more"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 inline-flex items-center transition-all duration-300"
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

              <div className="hidden lg:flex justify-end flex-1 text-right">
                <img src="hero-1.png" alt="Hero decor" />
              </div>
            </div>
          </div>
        </div>
        {/* // Hero */}

        <List position="home-page" />

        {/* FAQs */}
        <div className="border-t border-gray-200 py-20">
          <div className="container max-w-screen-xl mx-auto px-4 lg:px-0">
            <div className="mb-14">
              <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mt-0 mb-0">
                FAQs
              </h2>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap lg:gap-6">
              <div className="basis-full lg:basis-1/2">
                <div className="border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-xl p-4 transition-all duration-300">
                  <h3 className="mt-0 mb-4 leading-6">
                    Is there a free trial available?
                  </h3>
                  <p className="m-0">
                    Donec id dictum felis. Fusce ac nunc commodo, vestibulum
                    nisi ac, finibus ipsum. Vivamus vel tortor turpis.
                  </p>
                </div>{' '}
                {/* End question */}
                <div className="border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-xl p-4 mt-5 transition-all duration-300">
                  <h3 className="mt-0 mb-4 leading-6">
                    Can I change my plan later?
                  </h3>
                  <p className="m-0">
                    Donec id dictum felis. Fusce ac nunc commodo, vestibulum
                    nisi ac, finibus ipsum. Vivamus vel tortor turpis.
                  </p>
                </div>{' '}
                {/* End question */}
                <div className="border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-xl p-4 mt-5 transition-all duration-300">
                  <h3 className="mt-0 mb-4 leading-6">
                    What is your cancellation policy?
                  </h3>
                  <p className="m-0">
                    Donec id dictum felis. Fusce ac nunc commodo, vestibulum
                    nisi ac, finibus ipsum. Vivamus vel tortor turpis. Proin
                    pharetra nibh tellus, ac venenatis leo pretium luctus.
                    Nullam ut massa vitae purus semper ornare et sit amet eros.
                    Cras fringilla ipsum nec luctus cursus. Duis eget finibus
                    lacus. Ut quis diam sagittis, dignissim erat sed,
                    ullamcorper sapien.
                  </p>
                </div>{' '}
                {/* End question */}
              </div>

              <div className="basis-full lg:basis-1/2">
                <div className="border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-xl p-4 transition-all duration-300">
                  <h3 className="mt-0 mb-4 leading-6">
                    Can other info be added to an invoice?
                  </h3>
                  <p className="m-0">
                    Donec id dictum felis. Fusce ac nunc commodo, vestibulum
                    nisi ac, finibus ipsum. Vivamus vel tortor turpis. Proin
                    pharetra nibh tellus, ac venenatis leo pretium luctus.
                    Nullam ut massa vitae purus semper ornare et sit amet eros.
                    Cras fringilla ipsum nec luctus cursus. Duis eget finibus
                    lacus. Ut quis diam sagittis, dignissim erat sed,
                    ullamcorper sapien.
                  </p>
                </div>{' '}
                {/* End question */}
                <div className="border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-xl p-4 mt-5 transition-all duration-300">
                  <h3 className="mt-0 mb-4 leading-6">
                    How does billing work?
                  </h3>
                  <p className="m-0">
                    Etiam lacinia risus metus, ac molestie lectus hendrerit
                    vitae. Aliquam erat volutpat. Nulla faucibus auctor finibus.
                    Sed molestie justo sed sem venenatis tempus.
                  </p>
                </div>{' '}
                {/* End question */}
                <div className="border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-xl p-4 mt-5 transition-all duration-300">
                  <h3 className="mt-0 mb-4 leading-6">
                    How do I change my account email?
                  </h3>
                  <p className="m-0">
                    Donec id dictum felis. Fusce ac nunc commodo, vestibulum
                    nisi ac, finibus ipsum. Vivamus vel tortor turpis.
                  </p>
                </div>{' '}
                {/* End question */}
              </div>
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
