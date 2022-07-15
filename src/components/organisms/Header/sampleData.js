import CreateJobLink from '../CreateJobForm/createJobtLink';

const menuItems = new Map()
  .set('Browse contest', '/search-job')
  .set('Find a artist', '/search-artist')
  .set('How it works', '/how-it-works')
  .set('Submit Job', {
    path: '/create-job',
    component: CreateJobLink,
  });

export const DEFAULT_LINKS = new Map().set('menu', menuItems);
