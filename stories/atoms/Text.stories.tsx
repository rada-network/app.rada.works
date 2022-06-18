import { Story, Meta } from '@storybook/react';
import React from 'react';

import Text from '../../src/components/atoms/Text';

export default {
  title: 'Atoms/Text',
  component: Text,
} as Meta;

const Template: Story = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello world',
};
