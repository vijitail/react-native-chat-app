import React from 'react';
import PropTypes from 'prop-types';
import {Text as GalioText, theme} from 'galio-framework';

const Text = ({size, color, ...props}) => (
  <GalioText size={size} {...props} color={color || theme.COLORS.WHITE} />
);

Text.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Text;
