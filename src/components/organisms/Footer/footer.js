import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import TextLink from '../../atoms/TextLink';
import { useTranslation } from 'next-i18next';
import classes from './footer.module.css';
import { DEFAULT_LINKS, socialLinks, menuItems } from './sampleData';

const Footer = (props) => {
  const { links } = props;
  const { t } = useTranslation('common');

  const date = new Date();
  // const menuItem
  const linkElements = Array.from(socialLinks, ([text, pathInfo]) => {
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
  const socialItem = <ul className={classes.linkGroup}>{linkElements}</ul>;
  return (
    <Fragment>
      <footer className={classes.root}>
        <div>
          <div className={classes.copyrights}>
            {date.getFullYear()} Rada.works
          </div>
          <div className={classes.menuItems}>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className={classes.social} />
          {socialItem}
        </div>
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
