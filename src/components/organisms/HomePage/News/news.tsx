import React, { Fragment } from 'react';
import useThemes from 'src/hooks/useThemes';
import classes from './news.module.css';

const News = () => {
  const { isDark } = useThemes();
  const rootClass = isDark ? classes.rootDark : classes.root;
  return (
    <Fragment>
      <div className={`${rootClass} bg-gray-900 py-12 lg:py-24`}>
        <div className="container max-w-screen-xl mx-auto px-6 lg:px-4">
          <div className="mb-14 text-center">
            <h2 className="text-center text-4xl lg:text-6xl font-bold text-white dark:text-white mt-0 mb-0 tracking-tight">
              SoulMint Academy
            </h2>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-stretch gap-0 md:gap-8">
            <div className="basis-full md:basis-1/3 mb-12 md:mb-0">
              <div className="h-56 md:h-40 lg:h-56 overflow-hidden rounded-xl mb-6">
                <img
                  src="/news/news-1.jpg"
                  alt="SouldMint - The Ultimate HUB for all soul"
                />
              </div>

              <h3 className="mt-0 mb-2 text-gray-200 font-medium text-xl">
                <a
                  href="#"
                  title="SouldMint - The Ultimate HUB for all soul"
                  className="hover:text-indigo-600 transition-all duration-300"
                >
                  SouldMint - The Ultimate HUB for all soul
                </a>
              </h3>

              <div className="text-sm mb-4 text-gray-500">
                <span className="font-semibold mr-2">SoulMint</span>
                <span>Oct 01, 2022</span>
              </div>

              <p className="md:hidden lg:block my-0 text-gray-400 leading-relaxed">
                <strong>About Soulmint:</strong> Since its proposal in May 2022,
                Soulbound token have become an emerging tool for verification in
                the blockchain world, which can be deployed to showcase
                provenance of employment or education history, identity
                verification, credit-relevant history. In the future, we will be
                able to see even more application of SBT in our daily lives...
              </p>
            </div>
            {/* // News item */}

            <div className="basis-full md:basis-1/3 mb-12 md:mb-0">
              <div className="h-56 md:h-40 lg:h-56 overflow-hidden rounded-xl mb-6">
                <img
                  src="/news/news-2.webp"
                  alt="Soulbound token - The nex big thing in Blockchain"
                />
              </div>

              <h3 className="mt-0 mb-2 font-medium text-gray-200 text-xl">
                <a
                  href="#"
                  title="Soulbound token - The nex big thing in Blockchain"
                  className="hover:text-indigo-600 transition-all duration-300"
                >
                  Soulbound token - The nex big thing in Blockchain
                </a>
              </h3>

              <div className="text-sm mb-4 text-gray-500">
                <span className="font-semibold mr-2">SoulMint</span>
                <span>Oct 01, 2022</span>
              </div>

              <p className="md:hidden lg:block my-0 text-gray-400 leading-relaxed">
                ConsenSys and StarkWare have expanded their partnership to
                include ConsenSys Diligence smart contract auditing, providing a
                one-stop-shop for Web3 development.
              </p>
            </div>
            {/* // News item */}

            <div className="basis-full md:basis-1/3">
              <div className="h-56 md:h-40 lg:h-56 overflow-hidden rounded-xl mb-6">
                <img
                  src="/news/news-3.jpeg"
                  alt="Soulbound token - The nex big thing in Blockchain"
                />
              </div>

              <h3 className="mt-0 mb-2 text-gray-200 text-xl font-medium overflow-hidden ellipsis">
                <a
                  href="#"
                  title="Sample link"
                  className="hover:text-indigo-600 transition-all duration-300"
                >
                  What can you do with Soulbound token?
                </a>
              </h3>

              <div className="text-sm mb-4 text-gray-500">
                <span className="font-semibold mr-2">SoulMint</span>
                <span>Sep 10, 2022</span>
              </div>

              <p className="md:hidden lg:block my-0 text-gray-400 leading-relaxed">
              SBTs can be used, at a fundamental level, as proof of credentials to quickly reveal and verify a person’s identity. Exchanges can issue SBTs for the customers wallet to verify and satisfy their Know-Your-Client requirement. SBTs’ features, such as public visibility and non-transferability, have lots of potential and will accelerate the adoption of a decentralised society. Let us explore the potential of SBTs through their various use cases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default News;
