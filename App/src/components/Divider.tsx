import {View, Text} from 'react-native';
import React from 'react';
import {DividerType} from './components.type';

export default function Divider({text = ''}: DividerType) {
  return (
    <View className="w-full flex-row items-center" style={{gap: 12}}>
      <View className="flex-1 h-[1px] bg-[#979797]" />
      <Text className="text-[#979797]">{text}</Text>
      <View className="flex-1 h-[1px] bg-[#979797]" />
    </View>
  );
}
