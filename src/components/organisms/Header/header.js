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
          <div className={`${classes.topMenu}`}>{menuItems}</div>
          <ToggleTheme />
          <ConnectWallet />
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
