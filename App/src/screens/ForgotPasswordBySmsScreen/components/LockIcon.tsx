import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LockIconProps } from './components.types';

const LockIcon= ({ lockImage }:LockIconProps) => {
  return (
    <View style={styles.lockIcon}>
      <Image source={lockImage} style={styles.lockImage} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  lockIcon: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  lockImage: {
    width: '100%',
    height: '100%',
  },
});

export default LockIcon;
