import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
// import {useHeader} from '../../../hooks/useHeader';
import classes from './header.module.css';
import Logo from '../Logo';
import TextLink from '../../atoms/TextLink';
import ConnectWallet from '../ConnectWallet';
import { DEFAULT_LINKS } from './sampleData';

const Header = (props) => {
  const { links } = props;

  // const {welcomeText} = useHeader();

  const menuItems = Array.from(links, ([groupKey, linkProps]) => {
    const linkElements = Array.from(linkProps, ([text, pathInfo]) => {
      let path = pathInfo;
      let Component = Fragment;
      if (pathInfo && typeof pathInfo === 'object') {
        path = pathInfo.path;
        Component = pathInfo.Component;
      }

      const itemKey = `text: ${text} path:${path}`;
      const child = path ? (
        <TextLink className={classes.link} href={path}>
          {text}
        </TextLink>
      ) : (
        <span className={classes.label}>{text}</span>
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
      <header className={classes.root}>
        <div className={`${classes.logoContainer} flex-1 w-48`}>
          <Logo classes={{ logo: classes.logo }} />
        </div>
        <div className={classes.topMenu}>{menuItems}</div>
        <div className="container mx-auto">
          <div className="flex m-8 ">
            <ConnectWallet />
          </div>
        </div>
      </header>
    </Fragment>
  );
};

Header.defaultProps = {
  links: DEFAULT_LINKS,
};

Header.propTypes = {
  classes: shape({
    root: string,
  }),
};

export default Header;
