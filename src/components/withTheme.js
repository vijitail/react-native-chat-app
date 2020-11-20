import React from 'react';
import {GalioProvider, Block, Text, Input, Button} from 'galio-framework';

import customTheme from '../constants/theme';

Block.defaultProps = {
  style: {
    paddingHorizontal: 16,
  },
};

Text.defaultProps = {
  color: customTheme.COLORS.WHITE,
  style: {
    fontFamily: customTheme.FONTS.BOOK,
  },
};

Input.defaultProps = {
  placeholderTextColor: customTheme.COLORS.PLACEHOLDER,
  textInputStyle: {fontSize: 18, color: customTheme.COLORS.WHITE},
  bgColor: customTheme.COLORS.DARK,
  rounded: true,
};

Button.defaultProps = {
  uppercase: true,
  textStyle: {fontSize: 20, fontFamily: customTheme.FONTS.MEDIUM},
  round: true,
  style: {margin: 0, width: '100%'},
};

const withTheme = (Component) => () => (
  <GalioProvider theme={customTheme}>
    <Component />
  </GalioProvider>
);

export default withTheme;
