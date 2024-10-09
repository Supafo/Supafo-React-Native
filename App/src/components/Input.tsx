import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { InputType } from './components.type';
import IOSIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../utils/responsiveScale'; 

const {scale, moderateScale, verticalScale} = responsiveScale;

const Input = ({isSearchBar=false,user=false, isPassword, ...props }: InputType) => {
  const [display, setDisplay] = useState(!isPassword);
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={[styles.container,]}>
      {!isSearchBar?
      <Text style={[styles.heading, { fontSize: moderateScale(props.fontSize || moderateScale(13)) }]}>
        {props.heading || props.placeholder}
      </Text>  : null }
      <View style={styles.inputContainer}>
        {isSearchBar ? (
          
        props.icon && (
          <Image source={props.icon} style={props.iconStyle} />
        )
      ) : (user ? (
        <Feather name="user" color="#A0A5AD" size={moderateScale(20)} style={{paddingEnd:moderateScale(10),paddingStart:moderateScale(3),paddingBottom:verticalScale(2.5)}} />
      ) : (
        props.icon && (
          <Image source={props.icon} style={styles.icon} />
        )
      ))}
        {isSearchBar ? (
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={props.placeholder}
            {...props}
            style={[styles.textInput, { fontSize: moderateScale(13),paddingStart:moderateScale(10)}]}
            placeholderTextColor={'gray'}
          />) : (
        <TextInput
          secureTextEntry={!display}
          {...props}
          style={[styles.textInput, { fontSize: moderateScale(13),paddingStart:moderateScale(10) }, props.style]}
          placeholderTextColor={'gray'}
        />)}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setDisplay(!display)}
            style={styles.passwordToggle}>
            <IOSIcons
              name={display ? "eye-outline" : "eye-off-outline"}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('88%'),
    marginTop: moderateScale(8.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(16), // Adjusted border radius
    borderWidth: 1,
    borderColor: '#D0D5DD',
    paddingStart: moderateScale(8), 
    backgroundColor: 'white',
    width: wp('88%'),
    marginTop: moderateScale(2.5), // Adjusted margin top
  },
  heading: {
    color: '#333333',
    paddingStart: moderateScale(4),
    marginBottom: moderateScale(1),
    fontSize: moderateScale(13), // Adjusted font size
  },
  
  icon: {
    marginLeft: moderateScale(5),
    width: scale(16), 
    height: verticalScale(16),
    marginEnd: moderateScale(10),
  },
  textInput: {
    paddingVertical: verticalScale(6), // Adjusted padding
    paddingLeft: 0,
    flex: 1,
    color: '#333333',
    height: scale(33.5),
    paddingStart: moderateScale(10), // Adjusted padding
    fontSize: moderateScale(13), // Adjusted font size
  },
  passwordToggle: {
    marginRight: moderateScale(12),  
  },
  eyeIcon: {
    color: '#808080',
    fontSize: moderateScale(18), // Adjusted font size
  },
});

export default Input;
