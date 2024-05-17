import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';
import {useDispatch} from 'react-redux';
import {confirm} from '../../../../../store/slices/isCartConfirmed';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../../../navigation/routes';

const OrderDelivered = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <OrderDetailsContainer />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../../assets/images/bigicon.png')}
          style={styles.logo}
        />
        <Text style={styles.labelTxt}>
          Bizi tercih ettiğiniz için {'\nteşekkür ederiz..'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          dispatch(confirm(false));
          navigation.navigate(routes.RATINGS)
        }}>
        <Text style={styles.btnTxt}>Satıcıyı Değerlendir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDelivered;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    margin: 10,
    height: 190,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  labelTxt: {
    fontSize: 12,
    color: '#FF9200',
    textAlign: 'center',
    padding: 10,
  },
  btn: {
    backgroundColor: '#66AE7B',
    padding: 5,
    borderRadius: 30,
    marginBottom: 20,
    width: '90%',
  },
  btnTxt: {
    fontSize: 16,
    color: 'white',
    padding: 5,
    textAlign: 'center',
  },
  shadow_android: {},
  shadow_ios: {},
  /* SHADOW IOS_ANDROID EKLE */
});
