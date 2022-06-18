import Link, { LinkProps } from 'next/link';
import React, { FunctionComponent, Fragment } from 'react';
import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

export type ButtonLinkProps = LinkProps & {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const ButtonLink: FunctionComponent<ButtonLinkProps> = ({
  className,
  onClick,
  children,
  ...props
}) => {
  return (
    <Fragment>
      <Link {...props} passHref>
        <a className={className} onClick={onClick}>
          {children}
        </a>
      </Link>
      <style jsx>{styles}</style>
    </Fragment>
  );
};
export default ButtonLink;
