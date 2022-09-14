import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import classes from './header.module.css';
import Logo from '../Logo';
import TextLink from '../../atoms/TextLink';
import ConnectWallet from '../User/ConnectWallet';
import { useTranslation } from 'next-i18next';
import { DEFAULT_LINKS } from './sampleData';
import useThemes from 'src/hooks/useThemes';
import ToggleTheme from '../ToggleTheme';

const Header = (props) => {
  const { links } = props;

  const { t } = useTranslation('common');

  const { rootClassName } = useThemes();

  const menuItems = Array.from(links, ([groupKey, linkProps]) => {
    const linkElements = Array.from(linkProps, ([text, pathInfo]) => {
      let path = pathInfo;
      let Component = Fragment;
      if (pathInfo && typeof pathInfo === 'object') {
        path = pathInfo.path;
        Component = pathInfo.component;
      }

      const itemKey = `text: ${text} path:${path}`;
      const child = path ? (
        <TextLink className={classes.link} href={path}>
          {t(text)}
        </TextLink>
      ) : (
        <span className={classes.label}>{t(text)}</span>
      );

      return (
        <Component key={itemKey}>
          <li className={classes.linkItem}>{child}</li>
        </Component>
      );
    });

    return (
      <ul key={groupKey} className={classes.linkGroup}>
        {linkElements}
      </ul>
    );
  });

  return (
    <Fragment>
      <header className={`${classes[rootClassName]}`}>
        <div className={`${classes.logoContainer}`}>
          <TextLink className={classes.link} href={`/`}>
            <Logo classes={{ logo: classes.logo }} />
          </TextLink>
        </div>
        <div className={`${classes.menuContainer}`}>
          <div
            id="navbar-default"
            className="hidden w-full md:block md:w-auto order-last md:order-first"
          >
            {menuItems}
          </div>
          <ToggleTheme />
          <ConnectWallet />

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </header>
    </Fragment>
  );
};

Header.defaultProps = {
  links: DEFAULT_LINKS
};

Header.propTypes = {
  classes: shape({
    root: string
  })
};

export default Header;
