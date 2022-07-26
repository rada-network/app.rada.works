import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import TextLink from '../../atoms/TextLink';
import { useTranslation } from 'next-i18next';
import classes from './footer.module.css';
import { DEFAULT_LINKS, socialData, menuItemsData } from './sampleData';

const Footer = (_props) => {
  const { t } = useTranslation('common');
  const date = new Date();
  const year = date.getFullYear();
  function buildLink(data, type, htmlTag) {
    return Array.from(data, ([text, pathInfo]) => {
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
      const elem = htmlTag ? (
        <li className={classes.linkItem}>{child}</li>
      ) : (
        <div className={classes.linkItem}>{child}</div>
      );
      return <Component key={itemKey}>{elem}</Component>;
    });
  }
  const menuItem = buildLink(menuItemsData, 'menu', 'li');
  const socialElements = buildLink(socialData, 'social', '');
  const socialItem = <div className={classes.linkGroup}>{socialElements}</div>;
  const menuItems = <ul className={classes.linkGroup}>{menuItem}</ul>;
  return (
    <Fragment>
      <footer className={classes.root}>
        <div className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <span>
            {year}{' '}
            <a href="https://rada.works/" className="hover:underline">
              Rada.Works
            </a>
          </span>
        </div>
        <div className={classes.menuItems}>{menuItems}</div>
        <div className={classes.social}>{socialItem}</div>
      </footer>
    </Fragment>
  );
};

Footer.defaultProps = {
  links: DEFAULT_LINKS
};

Footer.propTypes = {
  classes: shape({
    root: string
  })
};

export default Footer;
