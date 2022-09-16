import CreateLink from '../Campaign/createLink';

const menuItems = new Map()
  .set('Home', '/')
  .set('How it works', '/how-it-works')
  .set('NFT Collections', '/nft-collections')
  .set('Browse coupons', '/coupons')
  /* .set('Dashboard', {
    path: '/my-campaign',
    component: CreateLink
  }) */
  .set('Create Campaign', {
    path: '/create-campaign',
    component: CreateLink
  });

export const DEFAULT_LINKS = new Map().set('menu', menuItems);
