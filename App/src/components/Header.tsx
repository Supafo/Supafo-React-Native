import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import IOSIcons from 'react-native-vector-icons/Ionicons';
import {HeaderType} from './components.type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/routes';

export default function Header({title, noBackButton = true}: HeaderType) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className="w-full flex-row py-[12px] px-[16px] justify-center items-center">
      {noBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-[24px] h-[24px] absolute left-[16px]">
          <IOSIcons
            name="arrow-back-outline"
            style={{color: '#333333', fontSize: 24}}
          />
        </TouchableOpacity>
      )}
      <Text className="text-[16px] font-[500]">{title}</Text>
    </View>
  );
}
