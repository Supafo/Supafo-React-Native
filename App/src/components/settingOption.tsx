import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ISettingOption} from './components.type';
import { moderateScale } from 'react-native-size-matters';

export const SettingOption: React.FC<ISettingOption> = ({
  right,
  title,
  onPress,
  style,
}) => {
  return (
    <Pressable style={[styles.root, style]} onPress={onPress}>
      <View style={styles.leftContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      <View style={styles.rightContainer}>{right}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 18,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    alignItems: 'center',
  },
  title: {
    marginLeft: 20,
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: '#5B5B5B',
  },
});
