import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';

const OrderCompleted = () => {

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.qrWrapper}>
        <Text style={styles.qrTitle}>Sipariş Kodu</Text>
        <Image
          source={require('../../../../../assets/images/qr-code-sample.png')}
          style={styles.qrImage}
        />
        <Text style={styles.qrLabelTxt}>
          Bu QR kodu okutarak 
          {'\nsürpriz paketinizi teslim alabilirsiniz.'}
        </Text>
      </View>
      <OrderDetailsContainer title={'Sipariş Tamamlandı'} />
      <View
        style={{
          width: '100%',
          marginTop: 20,
          marginEnd: 20,
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            dispatch(setOrderDetail('OrderDelivered'));
          }}>
          <Text style={styles.btnTxt}>İlerle</Text>
        </TouchableOpacity> */}
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
    paddingVertical: 30
  },
  qrTitle: {
    fontSize: 17,
    color: '#FF9200',
    fontWeight: '500'
  },
  qrImage: {
    width: 170,
    height: 170,
    margin: 10
  },
  qrLabelTxt: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
    padding: 5,
    fontWeight:'500',
    lineHeight: 17
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
