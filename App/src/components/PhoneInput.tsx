import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { PhoneInputType } from './components.type';

const PhoneInput = (props: PhoneInputType) => {
  const [countryCode, setCountryCode] = useState('TR');
  const [callingCode, setCallingCode] = useState('+90');
  const [phoneNumber, setPhoneNumber] = useState('');

  const callingCodeLength = callingCode.length;
  const maxLength = callingCodeLength + 10;


  const handleSelectCountry = (value) => {
    setCountryCode(value.code);
    setCallingCode(value.callingCode);
    props.onChangeNumber(value.callingCode)
  };

  const handleInputChange = (phone) => {
      setPhoneNumber(phone);
      props.onChangeNumber(phone);
    };

  const handleFocus = () => {
    setPhoneNumber('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.countryContainer}>
        <Text style={styles.label}>Ülke Kodu</Text>
        <View style={styles.countryPickerBorder}>
          <RNPickerSelect
            onValueChange={handleSelectCountry}
            items={[
              { label: 'TR +90', value: { code: 'TR', callingCode: '+90' } },
              { label: 'USA +1', value: { code: 'USA', callingCode: '+1' } },
              { label: 'UK +44', value: { code: 'UK', callingCode: '+44' } },
              // Add more countries as needed
            ]}
            placeholder={{ label: 'Ülke seçin', value: null, color: '#888888' }}
            style={{
              ...pickerSelectStyles,
              inputIOS: {
                ...pickerSelectStyles.inputIOS,
                color: '#333333',
              },
              inputAndroid: {
                ...pickerSelectStyles.inputAndroid,
                color: '#333333',
              },
            }}
            value={{ code: countryCode, callingCode }}
            useNativeAndroidPickerStyle={false}
          />
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
            style={styles.input}
            onFocus={handleFocus}
            onChangeText={handleInputChange} 
            placeholder={'123 456 78 90'}
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
    alignItems: 'center',
    height: '18%',
  },
  countryContainer: {
    marginRight: 5,
    justifyContent: 'center',
    flex: 2,
    marginBottom:11,
  },
  label: {
    color: '#333333',
    paddingLeft: 4,
    fontSize: 15,
  },
  countryPicker: {
    width: '100%',
    height: '50%',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 20,
    marginVertical: 5,
    color: '#333333', 
    flex: 1,
  },
  countryPickerBorder: {
    borderColor: '#D0D5DD',
    borderRadius: 20,
    backgroundColor: '#fff',
    height: '51%',
    marginTop: 5,
  },
  phoneContainer: {
    flex: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    backgroundColor: '#fff',
    marginTop: 4,
    paddingHorizontal: 3,
    borderRadius: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 7,
    borderColor: '#D0D5DD',
    color: '#333333', 
  },
  callingCode: {
    fontSize: 16,
    color: '#333333',
    marginRight: 5,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333333', 
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 20,
    height: 43,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333333',
  },
};

export default PhoneInput;
