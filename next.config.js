/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BSC_URL: process.env.BSC_URL,
    BSC_CHAIN_ID: process.env.BSC_CHAIN_ID,
    BSC_NETWORK_ID: process.env.BSC_NETWORK_ID,
    RADA_TOKEN_CONTRACT_ADDRESS: process.env.RADA_TOKEN_CONTRACT_ADDRESS,
    RADA_AUCTION_HOUSE_CONTRACT_ADDRESS:
      process.env.RADA_AUCTION_HOUSE_CONTRACT_ADDRESS,
    BSC_EXPLORER_URL: process.env.BSC_EXPLORER_URL,
  },
};

module.exports = nextConfig;
