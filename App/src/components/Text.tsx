import {Text as RNText, TextProps} from 'react-native';
import React from 'react';

const Text = (props: TextProps) => {
  return <RNText {...props}>{props.children}</RNText>;
};

export default Text;
