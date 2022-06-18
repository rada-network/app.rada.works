import { Story, Meta } from '@storybook/react';
import React from 'react';
import TextLink, { TextLinkProps } from '../../src/components/atoms/TextLink';

export default {
  title: 'Atoms/TextLink',
  component: TextLink,
} as Meta;

const Template: Story<TextLinkProps> = (args) => <TextLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: '/users',
  children: 'Text',
  style: {
    textDecoration: 'none',
  },
};
