import React, { FunctionComponent, Fragment, HTMLAttributes } from 'react';
import css from 'styled-jsx/css';

const styles = css`
  .size-base {
    font-size: 1.4rem;
    line-height: 1.7;
  }
  .size-small {
    font-size: 1.3rem;
    line-height: 1.7;
  }
`;

export type TextProps = HTMLAttributes<HTMLParagraphElement>;
const Text: FunctionComponent<TextProps> = ({ children, ...props }) => (
  <Fragment>
    <p {...props}>{children}</p>
    <style jsx>{styles}</style>
  </Fragment>
);

export default Text;
