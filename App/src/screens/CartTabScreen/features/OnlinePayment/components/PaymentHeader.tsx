import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

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
    padding: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '400',
    color: 'black',
  },
  icon: {
    width: scale(20),
    height: scale(20),
    padding: moderateScale(10),
    marginHorizontal: moderateScale(2),
  },
});
