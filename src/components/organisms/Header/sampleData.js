import CreateLink from '../Campaign/createLink';

const menuItems = new Map()
  .set('Home', '/')
  .set('How it works', '/how-it-works')
  .set('Browse coupons', '/search-coupon')
  .set('Create Campaign', {
    path: '/create-campaign',
    component: CreateLink
  });

export const DEFAULT_LINKS = new Map().set('menu', menuItems);
