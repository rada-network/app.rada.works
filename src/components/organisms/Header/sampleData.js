import CreateJobLink from '../CreateJob/createJobtLink';

const menuItems = new Map()
  .set('Browse jobs', '/search-job')
  .set('Find an artist', '/search-artist')
  .set('How it works', '/how-it-works')
  .set('Submit Job', {
    path: '/create-job',
    component: CreateJobLink
  });

export const DEFAULT_LINKS = new Map().set('menu', menuItems);
