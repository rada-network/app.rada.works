const socialLinks = new Map()
  .set('Telegram', null)
  .set('Twitter', null)
  .set('Facebook', null);

const menuItems = new Map()
  .set('Help', null)
  .set('Customer Service', '/customer-service')
  .set('Contact Us', {
    path: '/create-job',
    // Component: CreateJob
  });

export const DEFAULT_LINKS = new Map()
  .set('social', socialLinks)
  .set('menu', menuItems);

export const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipsicing elit, sed do eiusmod tempor incididunt ut labore et dolore.';
