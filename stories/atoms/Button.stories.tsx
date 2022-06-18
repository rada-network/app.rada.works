import { Story, Meta } from '@storybook/react';
import React from 'react';

import Button, { ButtonProps } from '../../src/components/atoms/Button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Button</Button>
);

export const Default = Template.bind({});
