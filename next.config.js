/** @type {import('next').NextConfig} */

const {i18n} = require("./next-i18next.config");

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when `next build` or `npm run build` is used
  const config = {
    reactStrictMode: true,
    env: {
      BSC_URL: process.env.BSC_URL,
      BSC_CHAIN_ID: process.env.BSC_CHAIN_ID,
      BSC_NETWORK_ID: process.env.BSC_NETWORK_ID,
      RADA_TOKEN_CONTRACT_ADDRESS: process.env.RADA_TOKEN_CONTRACT_ADDRESS,
      RADA_AUCTION_HOUSE_CONTRACT_ADDRESS:
      process.env.RADA_AUCTION_HOUSE_CONTRACT_ADDRESS,
      BSC_EXPLORER_URL: process.env.BSC_EXPLORER_URL,
      PUBLIC_URL: process.env.PUBLIC_URL,

      GRAPHQL_ENDPOINT_URL: process.env.GRAPHQL_ENDPOINT_URL,
      GRAPHQL_ENDPOINT_SYSTEM_URL: process.env.GRAPHQL_ENDPOINT_SYSTEM_URL,
      GRAPHQL_ENDPOINT_SYSTEM_API_TOKEN: process.env.GRAPHQL_ENDPOINT_SYSTEM_API_TOKEN,
      MORALIS_API_KEY: process.env.MORALIS_API_KEY
    },
    i18n,
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
    reactStrictMode: false,
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      domains: [
        "public.nftstatic.com",
        "lh3.googleusercontent.com",
        "public.bnbstatic.com",
        "s2.coinmarketcap.com"
      ],
    }
  };

  // next.config.js object
  return config;
};
