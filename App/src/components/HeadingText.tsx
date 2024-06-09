import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {HeadingTextType} from './components.type';
import {colors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';

export default function HeadingText(props: HeadingTextType) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: verticalScale(0),
    marginLeft: verticalScale(10),
  },
  title: {
    fontWeight: '600',
    fontSize: moderateScale(16),
    color: colors.greenColor,
    alignItems: 'center',
  },
});