import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import IOSIcons from 'react-native-vector-icons/Ionicons';
import {HeaderType} from './components.type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../navigation/routes';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';


export default function Header({title, noBackButton = true, style, onPress}: HeaderType) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View
      style={{
      zIndex:100,
      width:'100%',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: 'white',
      paddingTop: moderateScale(7.5),
      paddingHorizontal: moderateScale(15),
      }}>
        <View style={{flex:1,paddingStart:moderateScale(10)}}>
          {noBackButton && (
          <TouchableOpacity
            onPress={() => {
            navigation.goBack();
          }}
            style={{width:scale(18),height:scale(20)}}>
          <IOSIcons
            name="arrow-back-outline"
            style={{color: '#000000', fontSize: moderateScale(24)}}
          />
        </TouchableOpacity>
      )}
        </View>
      
      <View style={{flex:10,alignItems:'center',paddingRight:moderateScale(35)}}>
        <Text style={{fontSize:moderateScale(18),fontWeight:'400',color:'#000000'}}>
          {title}
        </Text>
      </View>
      
    </View>
  );
}
