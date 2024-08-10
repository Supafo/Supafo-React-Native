import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { PhoneNumberInputProps } from './components.types';

const PhoneNumberInput = ({ phone, setPhone }:PhoneNumberInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Telefon Numarası</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="123 456 78 90"
        placeholderTextColor="#9EA0A4"
        maxLength={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 2,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 22,
    color: 'black',
    height: 50,
  },
});

export default PhoneNumberInput;
