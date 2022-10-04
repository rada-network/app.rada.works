import React, { Fragment } from 'react';
import useThemes from 'src/hooks/useThemes';
import classes from './news.module.css';

const News = () => {
  const { isDark } = useThemes();
  const rootClass = isDark ? classes.rootDark : classes.root;
  return (
    <Fragment>
      <div className={`${rootClass} bg-gray-900 py-24`}>
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="mb-14 text-center">
            <h3 className="bg-violet-500 text-white inline-block text-sm rounded-full py-1.5 px-4 mx-auto mt-0 mb-3">
              SoulMint News
            </h3>
            <h2 className="text-center text-3xl md:text-4xl lg:text-6xl font-bold text-white dark:text-white mt-0 mb-0">
              Related Articles
            </h2>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-stretch gap-0 md:gap-8">
            <div className="basis-full md:basis-1/3 mb-8 md:mb-0">
              <div className="h-56 md:h-40 lg:h-56 overflow-hidden rounded-lg mb-4">
                <img src="/samples/news-1.jpg" alt="Sample image" />
              </div>

              <h3 className="mt-0 mb-2 text-gray-200 text-xl">
                <a
                  href="#"
                  title="Sample link"
                  className="hover:text-indigo-600 transition-all duration-300"
                >
                  ConsenSys Provides Web3 Dev Stack to StarkWare as Partnership
                  Expands
                </a>
              </h3>

              <div className="text-sm mb-4 text-gray-500">
                <span className="font-semibold mr-2">SoulMint</span>
                <div>Oct 01, 2022</div>
              </div>

              <p className="md:hidden lg:block my-0 text-gray-400">
                ConsenSys and StarkWare have expanded their partnership to
                include ConsenSys Diligence smart contract auditing, providing a
                one-stop-shop for Web3 development.
              </p>
            </div>
            {/* // News item */}

            <div className="basis-full md:basis-1/3 mb-8 md:mb-0">
              <div className="h-56 md:h-40 lg:h-56 overflow-hidden rounded-lg mb-4">
                <img src="/samples/news-2.jpg" alt="Sample image" />
              </div>

              <h3 className="mt-0 mb-2 text-gray-200 text-xl">
                <a
                  href="#"
                  title="Sample link"
                  className="hover:text-indigo-600 transition-all duration-300"
                >
                  How and Why are MetaMask Users Losing their Funds due to
                  Phishing Incidents?
                </a>
              </h3>

              <div className="text-sm mb-4 text-gray-500">
                <span className="font-semibold mr-2">SoulMint</span>
                <div>Oct 01, 2022</div>
              </div>

              <p className="md:hidden lg:block my-0 text-gray-400">
                ConsenSys and StarkWare have expanded their partnership to
                include ConsenSys Diligence smart contract auditing, providing a
                one-stop-shop for Web3 development.
              </p>
            </div>
            {/* // News item */}

            <div className="basis-full md:basis-1/3">
              <div className="h-56 md:h-40 lg:h-56 overflow-hidden rounded-lg mb-4">
                <img src="/samples/news-4.png" alt="Sample image" />
              </div>

              <h3 className="mt-0 mb-2 text-gray-200 text-xl overflow-hidden ellipsis">
                <a
                  href="#"
                  title="Sample link"
                  className="hover:text-indigo-600 transition-all duration-300"
                >
                  MetaMask Se Integra Ao Sistema Brasileiro De Pagamentos Via
                  Pix Para Compras Instantâneas De Criptomoedas
                </a>
              </h3>

              <div className="text-sm mb-4 text-gray-500">
                <span className="font-semibold mr-2">SoulMint</span>
                <div>Sep 10, 2022</div>
              </div>

              <p className="md:hidden lg:block my-0 text-gray-400">
                ConsenSys and StarkWare have expanded their partnership to
                include ConsenSys Diligence smart contract auditing, providing a
                one-stop-shop for Web3 development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default News;
