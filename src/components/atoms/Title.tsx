import React, { FunctionComponent, Fragment, HTMLAttributes } from 'react';
import css from 'styled-jsx/css';

export type TitleTypeType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const styles = css`
  .size-large {
    font-size: 2.4rem;
    font-weight: 600;
  }
  .size-medium {
    font-size: 1.8rem;
    font-weight: 600;
  }
  .size-small {
    font-size: 1.6rem;
    font-weight: 600;
  }
  .size-small--normal {
    font-size: 1.6rem;
  }
  .size-xsmall {
    font-size: 1.4rem;
    font-weight: 600;
  }
  .size-xsmall--normal {
    font-size: 1.4rem;
  }
`;

export type TitleProps = HTMLAttributes<HTMLElement> & { type?: TitleTypeType };

const Title: FunctionComponent<TitleProps> = ({
  children,
  type = 'h2',
  ...props
}) => {
  return (
    <Fragment>
      {type === 'h1' && <h1>{children}</h1>}
      {type === 'h2' && <h2 {...props}>{children}</h2>}
      {type === 'h3' && <h3 {...props}>{children}</h3>}
      {type === 'h4' && <h3 {...props}>{children}</h3>}
      {type === 'h5' && <h3 {...props}>{children}</h3>}
      {type === 'h6' && <h3 {...props}>{children}</h3>}
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default Title;
