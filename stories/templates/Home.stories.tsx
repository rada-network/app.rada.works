import { Story, Meta } from '@storybook/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { imageBase64Src } from 'stories/assets/base64Image';

import Home, { HomeProps } from '../../src/components/templates/Home';

export default {
  title: 'Templates/Home',
  component: Home,
} as Meta;

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
  nounInfo: {
    name: 'NFT 0',
    imageSrc: imageBase64Src,
    description: 'NFT 0 is a member of the NFT RADA',
    ownerAddress: '0x0000000002314',
  },
  nounAuctionInfo: {
    nftId: 7,
    amount: new BigNumber('4000000'),
    bidder: '0x234234234234',
    startTime: new Date(),
    endTime: new Date(),
    settled: false,
  },
};
