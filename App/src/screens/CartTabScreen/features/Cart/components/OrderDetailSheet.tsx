import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../../../api/url';
import {useNavigation} from '@react-navigation/native';

const OrderDetailSheet = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    fetch(BASE_URL)
      .then(resp => resp.json())
      .then(json => {
        let totalPrice = 0;
        json.forEach(element => {
          const itemPrice = element.quantity * element.price;
          totalPrice += itemPrice;
        });
        setTotalPrice(totalPrice);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <Text style={styles.txt}>Tutar:</Text>
        <Text>{totalPrice} TL</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.txt}>İndirim:</Text>
        <Text>-100 TL</Text>
      </View>
      <View style={styles.banner} />
      <View style={styles.wrapper}>
        <Text style={styles.txt}>Toplam:</Text>
        <Text>640 TL</Text>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('OnlinePaymentScreen')}>
          <Text style={styles.btnTxt}>Sepeti Onayla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDetailSheet;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FEFEFE', //White Color HexCode
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 10,
  },
  wrapper: {
    flexDirection: 'row',
    padding: 5,
  },
  txt: {
    flex: 1,
    fontSize: 18,
    color: '#333333', // Txt Color
  },
  banner: {
    backgroundColor: '#66AE7B',
    height: 1.5,
    marginStart: 10,
    marginEnd: 10,
    marginVertical: 10,
  },
  btnWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#66AE7B',
    padding: 5,
    borderRadius: 10,
    width: '100%',
  },
  btnTxt: {
    textAlign: 'center',
    color: '#FEFEFE',
    padding: 5,
    fontSize: 16,
    fontWeight: '600',
  },
});
