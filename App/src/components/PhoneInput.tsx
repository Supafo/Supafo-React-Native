import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { PhoneInputType } from './components.type';
import responsiveScale from '../utils/responsiveScale';

const {scale, moderateScale, verticalScale} = responsiveScale;

const PhoneInput = (props:PhoneInputType) => {
  const [callingCode] = useState('+90');
  const [phoneNumber, setPhoneNumber] = useState('');
  const maxLength = 10;

  const handleInputChange = (phone:string) => {
    setPhoneNumber(phone);
    props.onChangeNumber(phone);
  };

  const handleFocus = () => {
    setPhoneNumber('');
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.countryContainer}>
        <Text style={styles.label}>Ülke</Text>
          <View style={styles.countryPicker}>
            <Text style={styles.countryText}>{callingCode}</Text>
        </View>
      </View>
      <View style={styles.phoneContainer}>
        <Text style={[styles.label,{top:moderateScale(-4)}]}>
          {props.heading || props.placeholder}
        </Text>
        <View style={styles.inputContainer}>
          {props.icon && (
            <Image source={props.icon} style={styles.icon} />
          )}
          <TextInput
            value={phoneNumber}
            keyboardType="number-pad"
            maxLength={maxLength}
            style={styles.textInput}
            onFocus={handleFocus}
            onChangeText={handleInputChange}
            placeholderTextColor="#888888"
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent:'space-between',
    alignItems: 'center',
    marginTop: moderateScale(4),
    height: verticalScale(52),
    top: moderateScale(0.35),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingStart: moderateScale(5), // Adjusted padding
    height:'100%',
    flex: 1,
  },
  countryContainer: {
    marginRight: moderateScale(5), // Reduced margin
    justifyContent: 'center',
    height:'100%',
    flex: 1,
  },
  label: {
    color: '#333333',
    paddingLeft: moderateScale(3.25),
    fontSize: moderateScale(13), 
    marginTop: moderateScale(8.5),
    marginBottom: moderateScale(4),
    top: moderateScale(1.5),
  },
  
  countryPicker: {
    height: verticalScale(33.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: moderateScale(16), 
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(8), 
  },
  countryText: {
    color: '#333333',
    fontSize: moderateScale(13), 
  },
  phoneContainer: {
    flex: 4,
    height: verticalScale(52),
  },
  icon: {
    width: scale(16), 
    height: verticalScale(16),
    marginRight: moderateScale(8), 
  },
  textInput: {
    flex: 1,
    paddingVertical: verticalScale(6), 
    paddingHorizontal: moderateScale(10), 
    borderColor: '#D0D5DD',
    color: '#333333',
    borderWidth:1,
    height: verticalScale(33.5),
    borderRadius: moderateScale(16), 
    fontSize: moderateScale(13), 
  },
});

export default PhoneInput;
