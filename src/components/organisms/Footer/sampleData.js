export const socialData = [
  {
    title: 'Telegram',
    link: 'https://rada.works/telegram',
    icon: '/social/telegram.svg',
    iconDark: '/social/telegram.svg'
  },
  {
    title: 'Facebook',
    link: 'https://rada.works/telegram',
    icon: '/social/facebook.svg',
    iconDark: '/social/facebook.svg'
  },
  {
    title: 'Instagram',
    link: 'https://rada.works/Instagram',
    icon: '/social/instagram.svg',
    iconDark: '/social/instagram.svg'
  },
  {
    title: 'Twitter',
    link: 'https://rada.works/telegram',
    icon: '/social/twitter.svg',
    iconDark: '/social/twitter.svg'
  }
];

export const menuItemsData = new Map()
  .set('Term of Service', '/term-of-service')
  .set('Privacy Policy', '/privacy-policy');

export const DEFAULT_LINKS = new Map()
  .set('socialData', socialData)
  .set('menuItemsData', menuItemsData);

export const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipsicing elit, sed do eiusmod tempor incididunt ut labore et dolore.';
