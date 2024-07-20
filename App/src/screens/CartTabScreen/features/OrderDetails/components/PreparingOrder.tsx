import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setOrderDetail} from '../../../../../store/slices/orderDetail';

const PreparingOrder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.main}>
      <OrderDetailsContainer />
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
    borderRadius: 100,
    margin: 20,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  btn: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 30,
    marginBottom: 20,
    width: '90%',
    borderColor: '#66AE7B',
    borderWidth: 1,
  },
  btnTxt: {
    fontSize: 16,
    color: '#66AE7B',
    padding: 5,
    textAlign: 'center',
  },
});
