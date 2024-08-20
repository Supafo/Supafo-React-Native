import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { InputType } from './components.type';
import IOSIcons from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Input = ({isSearchBar=false, isPassword, ...props }: InputType) => {
  const [display, setDisplay] = useState(!isPassword);
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={[styles.container, props.style]}>
      {!isSearchBar?
      <Text style={[styles.heading, { fontSize: moderateScale(props.fontSize || moderateScale(14)) }]}>
        {props.heading || props.placeholder}
      </Text>  : null }
      <View style={styles.inputContainer}>
        {isSearchBar ? (
        props.icon && (
          <Image source={props.icon} style={props.iconStyle} />
        )
      ) : (
          props.icon && (
          <Image source={props.icon} style={styles.icon} />
        ))}
        {isSearchBar ? (
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={props.placeholder}
            style={[styles.textInput, { fontSize: moderateScale(14) }]}
            placeholderTextColor={'gray'}
            {...props}
          />) : (
        <TextInput
          secureTextEntry={!display}
          {...props}
          style={[styles.textInput, { fontSize: moderateScale(14) }]}
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
    width: '100%',
    height:verticalScale(60),
    marginTop: verticalScale(4.5),
  },
  heading: {
    color: '#333333',
    paddingStart: moderateScale(4),
    fontSize: moderateScale(14), // Adjusted font size
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(16), // Adjusted border radius
    borderWidth: 1,
    borderColor: '#D0D5DD',
    paddingHorizontal: moderateScale(8), // Adjusted padding
    backgroundColor: 'white',
    width: '100%',
    marginTop: verticalScale(4), // Adjusted margin top
  },
  icon: {
    width: scale(18), // Adjusted width and height
    height: scale(18),
    marginRight: moderateScale(8), // Adjusted margin
  },
  textInput: {
    paddingVertical: verticalScale(6), // Adjusted padding
    paddingLeft: 0,
    flex: 1,
    color: '#333333',
    paddingStart: moderateScale(10), // Adjusted padding
    fontSize: moderateScale(14), // Adjusted font size
  },
  passwordToggle: {
    marginRight: moderateScale(12), // Adjusted margin
  },
  eyeIcon: {
    color: '#808080',
    fontSize: moderateScale(18), // Adjusted font size
  },
});

export default Input;
