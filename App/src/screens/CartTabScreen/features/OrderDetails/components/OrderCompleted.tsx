import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';
import {setOrderDetail} from '../../../../../store/slices/orderDetail';
import {useDispatch} from 'react-redux';

const OrderCompleted = () => {
  const dispatch = useDispatch();

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.qrWrapper}>
        <Text style={styles.qrTitle}>Sipariş Kodu</Text>
        <Image
          source={require('../../../../../assets/images/qr-code-sample.png')}
          style={styles.qrImage}
        />
        <Text style={styles.qrLabelTxt}>
          Kodu{' '}
          {<Text style={{color: '#FF9200'}}>“siparişiniz tamamlandı”</Text>}{' '}
          bildirimi gelince sürpriz paketinizi alırken okutunuz.
        </Text>
      </View>
      <OrderDetailsContainer />
      <View
        style={{
          width: '100%',
          marginTop: 20,
          marginEnd: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            dispatch(setOrderDetail('OrderDelivered'));
          }}>
          <Text style={styles.btnTxt}>İlerle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderCompleted;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  qrWrapper: {
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 10,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#66AE7B',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
  },
  qrTitle: {
    fontSize: 16,
    color: '#FF9200',
  },
  qrImage: {
    width: 170,
    height: 170,
  },
  qrLabelTxt: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
    padding: 5,
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
    color: '#333333',
    padding: 5,
    textAlign: 'center',
  },
});
