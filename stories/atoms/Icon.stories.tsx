import { Story, Meta } from '@storybook/react';
import React from 'react';

import Icon, { IconProps } from '../../src/components/atoms/Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'fas fa-address-book',
};
