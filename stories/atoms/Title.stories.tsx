import { Story, Meta } from '@storybook/react';
import React from 'react';

import Title, { TitleProps } from '../../src/components/atoms/Title';

export default {
  title: 'Atoms/Title',
  component: Title,
} as Meta;

const Template: Story<TitleProps> = (args) => <Title {...args}>Title</Title>;

export const Default = Template.bind({});
Default.args = {
  children: 'Title',
};

export const Large = Template.bind({});
Large.args = {
  className: 'size-large',
};
export const Medium = Template.bind({});
Medium.args = {
  className: 'size-medium',
};
export const Small = Template.bind({});
Small.args = {
  className: 'size-small',
};

export const H2 = Template.bind({});
H2.args = {
  type: 'h2',
  children: 'Title',
};

export const H3 = Template.bind({});
H3.args = {
  type: 'h3',
  children: 'Title',
};

export const H4 = Template.bind({});
H4.args = {
  type: 'h4',
  children: 'Title',
};

export const H5 = Template.bind({});
H5.args = {
  type: 'h5',
  children: 'Title',
};

export const H6 = Template.bind({});
H6.args = { type: 'h6', children: 'Title' };
