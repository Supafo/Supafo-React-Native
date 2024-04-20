import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AppleLogo, FBLogo, GoogleLogo} from '../../../assets/images';

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
      className="w-[44px] h-[44px] bg-white border-[1px] border-[#D0D5DD] rounded-[8px] items-center justify-center">
      <Image
        source={image}
        className="w-[24px] h-[24px]"
        resizeMode="contain"
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
    <View className="flex-row justify-center items-center" style={{gap: 16}}>
      <Button image={GoogleLogo} onPress={googleOnPress} />
      <Button image={AppleLogo} onPress={appleOnPress} />
      <Button image={FBLogo} onPress={fbOnPress} />
    </View>
  );
}
