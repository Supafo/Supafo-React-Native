import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setOrderDetail} from '../../../../../store/slices/orderDetail';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

const PreparingOrder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.main}>
      <OrderDetailsContainer title={'Sipariş Detayı'} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../../assets/images/bigicon.png')}
          style={styles.logo}
        />
      </View>
      {/* <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          dispatch(setOrderDetail('OrderCompleted'));
        }}>
        <Text style={styles.btnTxt}>İlerle</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default PreparingOrder;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(999),
    margin: moderateScale(20),
    height: scale(200),
    width: scale(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: scale(85),
    height: verticalScale(85),
    resizeMode: 'contain',
    top: moderateScale(25),
  },
  btn: {
    backgroundColor: 'white',
    padding: moderateScale(5),
    borderRadius: moderateScale(30),
    marginBottom: verticalScale(20),
    width: '90%',
    borderColor: '#66AE7B',
    borderWidth: moderateScale(1),
  },
  btnTxt: {
    fontSize: moderateScale(16),
    color: '#66AE7B',
    padding: moderateScale(5),
    textAlign: 'center',
  },
});
