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
import responsiveScale from '../../../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;
export const Button = ({
  image,
  onPress,
}: {
  image: ImageSourcePropType;
  onPress: () => {} | void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
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
    width: scale(42.5),
    height:verticalScale(42.5),
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'#D0D5DD',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  imageStyle:{
    width: scale(24),
    height: verticalScale(24),
    resizeMode:'contain',
  },
  buttonStyle:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(16),
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(5),
  },
})
