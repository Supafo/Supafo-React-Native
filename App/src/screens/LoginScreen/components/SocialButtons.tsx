import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {AppleLogo, FBLogo, GoogleLogo} from '../../../assets/images';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export const Button = ({
  image,
  onPress,
}: {
  image: ImageSourcePropType;
  onPress: () => {} | void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.containerButtonStyle}>
      <Image
        source={image}
        style={styles.imageStyle}
      />
    </TouchableOpacity>
  );
};

export default function SocialButtons({
  googleOnPress,
  appleOnPress,
  fbOnPress,
}: {
  googleOnPress: () => {} | void;
  appleOnPress: () => {} | void;
  fbOnPress: () => {} | void;
}) {
  return (
    <View
      style={styles.buttonStyle}>
      <Button image={GoogleLogo} onPress={googleOnPress} />
      <Button image={AppleLogo} onPress={appleOnPress} />
      <Button image={FBLogo} onPress={fbOnPress} />
    </View>
  );
}
const styles = StyleSheet.create({
  containerButtonStyle:{
    width:moderateScale(37.5),
    height:verticalScale(37.5),
    backgroundColor:'white',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  imageStyle:{
    width:moderateScale(24),
    height:verticalScale(24),
    resizeMode:'contain',
  },
  buttonStyle:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(16),
    margin: moderateScale(10)
  },
})
