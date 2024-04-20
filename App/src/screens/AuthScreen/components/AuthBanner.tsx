import {View, Image} from 'react-native';
import React from 'react';
import {AuthBannerImage} from '../../../assets/images';
import Text from '../../../components/Text';

export default function AuthBanner() {
  return (
    <View className="rounded-[10px] w-full h-[100px] bg-[#66AE7B]">
      <View className="flex-1 justify-center pl-[30px]">
        <Text className="text-white font-bold text-[24px]">%15</Text>
        <Text className="text-white text-[10px] w-[120px]">
          daha uygun yemek ve tatlı paketi seçenekleri
        </Text>
      </View>
      <Image
        source={AuthBannerImage}
        resizeMode="contain"
        className="absolute right-0 w-[102.18px] h-[100px]"
      />
    </View>
  );
}
