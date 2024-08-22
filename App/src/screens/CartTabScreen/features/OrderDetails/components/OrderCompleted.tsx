import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

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
          marginTop: verticalScale(20),
          marginEnd: moderateScale(20),
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
    marginStart: moderateScale(20),
    marginEnd: moderateScale(20),
    marginBottom: verticalScale(10),
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(20),
    borderColor: '#66AE7B',
    padding: moderateScale(15),
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    paddingVertical: verticalScale(30),
  },
  qrTitle: {
    fontSize: moderateScale(17),
    color: '#FF9200',
    fontWeight: '500',
  },
  qrImage: {
    width: scale(170),
    height: scale(170),
    margin: moderateScale(10),
  },
  qrLabelTxt: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: '#333333',
    padding: moderateScale(5),
    fontWeight: '500',
    lineHeight: 17,
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
    color: '#333333',
    padding: moderateScale(5),
    textAlign: 'center',
  },
});
