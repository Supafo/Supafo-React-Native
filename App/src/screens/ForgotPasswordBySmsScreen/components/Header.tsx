import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { HeaderProps } from './components.types';

const Header = ({ title, onBackPress, backButtonImage }:HeaderProps) => {
  return (
    <View style={styles.header}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Image source={backButtonImage} style={styles.backButton} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 15,
  },
  backButton: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    marginRight:17.5,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
    color: 'black',
  },
});

export default Header;
