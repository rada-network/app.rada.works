import React, {
  FunctionComponent,
  ButtonHTMLAttributes,
  Fragment,
} from 'react';
import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => (
  <Fragment>
    <button {...props}>{children}</button>
    <style jsx>{styles}</style>
  </Fragment>
);
export default Button;
