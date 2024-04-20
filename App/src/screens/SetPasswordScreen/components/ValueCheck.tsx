import {View, Text} from 'react-native';
import React from 'react';
import IOSIcons from 'react-native-vector-icons/Ionicons';

export default function ValueCheck({
  check = false,
  text = '',
}: {
  check: boolean;
  text: string;
}) {
  return (
    <View className="flex-row items-center">
      {check ? (
        <View className="w-[18px] h-[18px] mr-[8px] border-[1px] border-[#66AE7B] bg-[#66AE7B] rounded-full">
          <IOSIcons
            name="checkmark-outline"
            style={{color: '#fff', fontSize: 16}}
          />
        </View>
      ) : (
        <View className="w-[18px] h-[18px] mr-[8px] border-[2px] border-[#66AE7B] bg-white rounded-full" />
      )}
      <Text>{text}</Text>
    </View>
  );
}
