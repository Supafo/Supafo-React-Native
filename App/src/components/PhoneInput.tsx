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
        <View style={styles.countryPickerBorder}>
          <View style={styles.countryPicker}>
            <Text style={styles.countryText}>{callingCode}</Text>
          </View>
        </View>
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.label}>
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
    marginTop: moderateScale(4.5),
    height: verticalScale(60), // Adjusted height
  },
  countryContainer: {
    marginRight: moderateScale(5), // Reduced margin
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: '#333333',
    paddingLeft: moderateScale(4),
    fontSize: moderateScale(15), // Adjusted font size
  },
  countryPickerBorder: {
    borderColor: '#D0D5DD',
    borderRadius: moderateScale(20), // Adjusted border radius
    backgroundColor: '#fff',
    height: '63%',
    marginTop: moderateScale(5),
  },
  countryPicker: {
    height: '100%',
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
    fontSize: moderateScale(15), // Adjusted font size
  },
  phoneContainer: {
    flex: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(8), // Adjusted padding
    flex: 1,
  },
  icon: {
    width: moderateScale(18), // Adjusted width and height
    height: moderateScale(18),
    marginRight: moderateScale(8), // Adjusted margin
  },
  textInput: {
    flex: 1,
    paddingVertical: moderateScale(6), // Adjusted padding
    paddingHorizontal: moderateScale(10), // Adjusted padding
    marginTop:moderateScale(4),
    borderColor: '#D0D5DD',
    color: '#333333',
    borderWidth:1,
    borderRadius: moderateScale(16), // Adjusted border radius
    fontSize: moderateScale(15), // Adjusted font size
  },
});

export default PhoneInput;
