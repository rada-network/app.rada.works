import { Story, Meta } from '@storybook/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { imageBase64Src } from 'stories/assets/base64Image';

import NounInfo, {
  NounInfoProps,
} from '../../src/components/organisms/NounInfo';

export default {
  title: 'Organisms/NounInfo',
  component: NounInfo,
} as Meta;

const Template: Story<NounInfoProps> = (args) => <NounInfo {...args} />;

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
