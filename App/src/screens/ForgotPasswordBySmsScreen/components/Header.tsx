import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { HeaderProps } from './components.types';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const Header = ({ title, onBackPress, backButtonImage }:HeaderProps) => {
  return (
    <View style={styles.header}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Image source={backButtonImage} style={styles.backButton} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
    marginRight: moderateScale(15),
  },
  backButton: {
    width: moderateScale(24),
    height: verticalScale(24),
    marginRight: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(18),
    marginRight: moderateScale(17.5),
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
    color: 'black',
  },
});

export default Header;
