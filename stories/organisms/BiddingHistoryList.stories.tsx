import { Story, Meta } from '@storybook/react';
import React from 'react';

import BiddingHistoryList, {
  BiddingHistoryListProps,
} from '../../src/components/organisms/BiddingHistoryList';

export default {
  title: 'Organisms/BiddingHistoryList',
  component: BiddingHistoryList,
} as Meta;

const Template: Story<BiddingHistoryListProps> = (args) => (
  <BiddingHistoryList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tokenId: 1,
  biddings: [
    {
      transactionHash:
        '0xeeb0232607a58c7e2d51b3685c2d865a1a8671dde9da502664b1de2c7daee077',
      nonce: '1',
      fromAddress: '0x5d7cc4345a2e2cb32e6ae4b3dff18153ee61eb11',
      biddedTokenId: 1,
      biddedAmount: '2',
    },
    {
      transactionHash:
        '0xeeb0232607a58c7e2d51b3685c2d865a1a8671dde9da502664b1de2c7daee077',
      nonce: '2',
      fromAddress: '0x5d7cc4345a2e2cb32e6ae4b3dff18153ee61eb11',
      biddedTokenId: 1,
      biddedAmount: '2',
    },
    {
      transactionHash:
        '0xeeb0232607a58c7e2d51b3685c2d865a1a8671dde9da502664b1de2c7daee077',
      nonce: '3',
      fromAddress: '0x5d7cc4345a2e2cb32e6ae4b3dff18153ee61eb11',
      biddedTokenId: 1,
      biddedAmount: '2',
    },
  ],
};
