import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {HeadingTextType} from './components.type';
import {colors} from '../theme/colors';

export default function HeadingText(props: HeadingTextType) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 17,
    marginTop: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.greenColor,
    alignItems: 'center',
  },
});
