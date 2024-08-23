import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { PhoneInputType } from './components.type';

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
        <Text style={[styles.label,{top:-7}]}>
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
    width: '102%',
    alignItems: 'center',
    marginTop: verticalScale(5.5),
    height: verticalScale(55), // Adjusted height
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(8), // Adjusted padding
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
    fontSize: moderateScale(15), // Adjusted font size
    marginTop: verticalScale(8.5),
    marginBottom: verticalScale(4),
  },
  
  countryPicker: {
    height: verticalScale(35.75),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: moderateScale(16), // Adjusted border radius
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(8), // Adjusted padding
  },
  countryText: {
    color: '#333333',
    fontSize: moderateScale(14), // Adjusted font size
  },
  phoneContainer: {
    flex: 4,
    height: verticalScale(55),
  },
  icon: {
    width: moderateScale(16), // Adjusted width and height
    height: verticalScale(16),
    marginRight: moderateScale(8), // Adjusted margin
  },
  textInput: {
    flex: 1,
    paddingVertical: verticalScale(6), // Adjusted padding
    paddingHorizontal: moderateScale(10), // Adjusted padding
    borderColor: '#D0D5DD',
    color: '#333333',
    borderWidth:1,
    height: verticalScale(35.75),
    borderRadius: moderateScale(16), // Adjusted border radius
    fontSize: moderateScale(14), // Adjusted font size
  },
});

export default PhoneInput;
