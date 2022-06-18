import { Story, Meta } from '@storybook/react';
import React from 'react';
import Image, { ImageProps } from '../../src/components/atoms/Image';

export default {
  title: 'Atoms/Image',
  component: Image,
} as Meta;

const Template: Story<ImageProps> = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://picsum.photos/50/50',
  alt: 'ItemImage',
};
