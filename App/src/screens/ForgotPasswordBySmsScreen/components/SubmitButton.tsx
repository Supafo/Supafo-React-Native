import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SubmitButtonProps } from './components.types';

const SubmitButton = ({
  onPress,
  isEnabled,
  title,
}:SubmitButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isEnabled ? '#70bc63' : '#84a17f' },
      ]}
      onPress={onPress}
      disabled={!isEnabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A3D8A3',
    padding: 15,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubmitButton;
