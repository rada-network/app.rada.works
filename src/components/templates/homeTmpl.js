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
          <div className="container max-w-screen-xl mx-auto">
            <div className="flex items-center lg:py-20">
              <div className="basis-2/5">
                <h1 className="my-0 text-3xl lg:text-6xl font-semibold text-gray-800 leading-relaxed">
                  A multichain
                  <br /> NFT design
                  <br /> flatform
                </h1>
                <p>
                  Morbi eros tortor, bibendum in erat non, pretium efficitur
                  felis. Sed id enim ut arcu molestie aliquet. Cras ac metus ac
                  enim dapibus feugiat vitae ac orci. Nullam neque ipsum,
                  iaculis in tincidunt quis, egestas id arcu.
                </p>

                <div className="mt-6">
                  <a href="#" title="View more">
                    View all
                  </a>
                </div>
              </div>

              <div className="flex-1">fsdfds</div>
            </div>
          </div>
        </div>
        {/* // Hero */}

        <List position="home-page" />

        {/* FAQs */}

        {/* // FAQs */}
      </MainTmpl>
    </Fragment>
  );
};

HomeTmpl.propTypes = {};

export default HomeTmpl;
