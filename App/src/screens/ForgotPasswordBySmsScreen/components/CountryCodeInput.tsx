import React from 'react';
import {StyleSheet, View, Text, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { CountryCodeInputProps } from './components.types';

const CountryCodeInput= ({
  countryCode,
  setCountryCode,
  pickerIcon,
}:CountryCodeInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Ülke Kodu</Text>
      <View style={styles.countryCodeBox}>
        <Text style={styles.countryCodeText}>{countryCode}</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={setCountryCode}
            items={[
              { label: 'TR +90', value: '+90' },
              { label: 'UK +44', value: '+44' },
              { label: 'USA +1', value: '+1' },
            ]}
            value={countryCode}
            placeholder={{
              label: 'Ülke kodunu seçin...',
              value: null,
              color: '#9EA0A4',
            }}
            Icon={() => <Image source={pickerIcon} style={styles.pickerIcon} />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 22,
    paddingHorizontal: 5,
    marginBottom:14,
    height: 50,
  },
  countryCodeText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  pickerContainer: {
    flex: 2,
  },
  pickerIcon: {
    width: 20,
    height: 40,
  },
});

export default CountryCodeInput;
