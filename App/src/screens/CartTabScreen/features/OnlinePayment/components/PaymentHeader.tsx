import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';

const PaymentHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../../../assets/images/arrow-back.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Online Ödeme</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CartTabScreen')}>
        <Image
          source={require('../../../../../assets/images/cart-tab-icon.png.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PaymentHeader;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1.5,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  icon: {
    width: 20,
    height: 20,
    padding: 5,
    margin: 5,
  },
});
