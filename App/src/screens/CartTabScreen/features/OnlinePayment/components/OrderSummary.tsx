import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import fireStore from '@react-native-firebase/firestore'

const OrderSummary = () => {
  const [items, setItems] = useState()
  const [discount, setDiscount] = useState(100)
  const [totalPrice, setTotalPrice] = useState(0);

  const getDocuments = async () => {
    try {
      const querySnapshot = await fireStore().collection('cart').get();
      const docs: any = [];

      querySnapshot.forEach(doc => {
        docs.push({id: doc.id, ...doc.data()});
      });

      setItems(docs);
      return docs;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  const calculatePrice = () => {
    let totalPrice = 0;
    if (items) {
      items.forEach((item: any) => {
        const itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;
      });

      setTotalPrice(totalPrice.toFixed(2));
    }
  };

  useEffect(() => {
    getDocuments();
    calculatePrice();
  }, [items]);


  return (
    <View style={styles.main}>
      <Text style={styles.title}>Hesap Özeti</Text>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.labelTxt}>Tutar</Text>
          <Text style={styles.priceTxt}>{totalPrice}TL</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.labelTxt}>İndirim</Text>
          <Text style={styles.priceTxt}>-{discount}TL</Text>
        </View>
        <View style={styles.banner} />
        <View style={styles.wrapper}>
          <Text style={styles.labelTxt}>Toplam</Text>
          <Text style={styles.priceTxt}>{(totalPrice - discount).toFixed(2)}TL</Text>
          {/* TotalPrice - Discount */}
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderColor: '#D0D5DD',
    borderWidth: 1.5,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  main: {
    marginStart: 20,
    marginEnd: 20,
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
    padding: 5,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  labelTxt: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  priceTxt: {
    fontSize: 16,
    color: '#333333',
  },
  banner: {
    backgroundColor: '#66AE7B',
    height: 1.5,
    marginVertical: 10,
    width: '100%',
  },
});
