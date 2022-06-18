import { Story, Meta } from '@storybook/react';
import React from 'react';

import ButtonLink, {
  ButtonLinkProps,
} from '../../src/components/atoms/ButtonLink';

export default {
  title: 'Atoms/ButtonLink',
  component: ButtonLink,
} as Meta;

const Template: Story<ButtonLinkProps> = (args) => (
  <ButtonLink {...args}>Button</ButtonLink>
);

export const Default = Template.bind({});
Default.args = {
  href: '/example',
};
