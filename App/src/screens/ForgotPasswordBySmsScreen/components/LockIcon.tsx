import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LockIconProps } from './components.types';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const LockIcon= ({ lockImage }:LockIconProps) => {
  return (
    <View style={styles.lockIcon}>
      <Image source={lockImage} style={styles.lockImage} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  lockIcon: {
    height: verticalScale(140),
    width: moderateScale(140),
    backgroundColor: '#fff',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2),
    borderColor: '#fff',
  },
  lockImage: {
    width: '100%',
    height: '100%',
  },
});

export default LockIcon;
