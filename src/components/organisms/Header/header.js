import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
// import {useHeader} from '../../../hooks/useHeader';
import classes from './header.module.css';
import Logo from '../Logo';
import TextLink from '../../atoms/TextLink';
import ConnectWallet from '../ConnectWallet';
import { DEFAULT_LINKS } from './sampleData';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

const Header = (props) => {
  const { links } = props;

  const { t } = useTranslation('common');

  // const {welcomeText} = useHeader();

  const { status } = useSession();

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
          {t(text)}
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

    const createJobLink =
      status === 'authenticated' ? (
        <Fragment>
          <li className={classes.linkItem}>
            <TextLink className={classes.link} href={`/create-job`}>
              {t('Create Job')}
            </TextLink>
          </li>
        </Fragment>
      ) : null;

    return (
      <ul key={groupKey} className={classes.linkGroup}>
        {linkElements}
        {createJobLink}
      </ul>
    );
  });

  return (
    <Fragment>
      <header className={classes.root}>
        <div className={`${classes.logoContainer} flex-1 w-48`}>
          <TextLink className={classes.link} href={`/`}>
            <Logo classes={{ logo: classes.logo }} />
          </TextLink>
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
