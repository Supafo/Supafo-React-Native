import {View, Text,StyleSheet} from 'react-native';
import React from 'react';
import {DividerType} from './components.type';
import responsiveScale from '../utils/responsiveScale';

const {scale, moderateScale, verticalScale} = responsiveScale; 

export default function Divider({text = ''}: DividerType) {
  return (
    <View className="flex-row items-center" style={{gap: 12, width: '66%'}}>
      <View className="flex-1 h-[1px] bg-[#979797]" />
      <Text style={styles.text}>{text}</Text>
      <View className="flex-1 h-[1px] bg-[#979797]" />
    </View>
  );
}
const styles=StyleSheet.create({
  text:{
    fontSize: moderateScale(11.25),
    color:'#979797',
    marginHorizontal: moderateScale(-6.15),
  }
})
