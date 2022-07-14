import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../atoms/Image';
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
      classes={{ image: classes.logo }}
      height={height}
      src={'https://rada.works/images/radaworks-logo.png'}
      title={'Rada.Works'}
      width={width}
    />
  );
};

Logo.propTypes = {
  classes: PropTypes.shape({
    logo: PropTypes.string,
  }),
  height: PropTypes.number,
  width: PropTypes.number,
};

Logo.defaultProps = {
  height: 18,
  width: 102,
};

export default Logo;
