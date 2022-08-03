import React from 'react';
import PropTypes from 'prop-types';
// import Image from '../../atoms/Image';
import Image from 'next/image';
// import logo from './logo.png';

/**
 * A component that renders a logo in the header.
 *
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const Logo = (props) => {
  const { height, width, classes } = props;

  return (
    <Image
      className={classes.logo}
      height={height}
      // layout="fill"
      src={'/logo-animate.svg'}
      title={'Rada.Works'}
      width={width}
    />
  );
};

Logo.propTypes = {
  classes: PropTypes.shape({
    logo: PropTypes.string
  }),
  height: PropTypes.number,
  width: PropTypes.number
};

Logo.defaultProps = {
  height: 12,
  width: 12
};

export default Logo;
