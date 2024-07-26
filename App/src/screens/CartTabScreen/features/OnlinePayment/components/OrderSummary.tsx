import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';

const OrderSummary = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [discount, setDiscount] = useState(100);

  const userId = useSelector((state: RootState) => state.setUserId.id);

  const getDocuments = async () => {
    try {
      const querySnapshot = await firestore()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .get();
      const docs: any = [];

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        docs.push({id: doc.id, ...data});
      });

      setItems(docs);
      return docs;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  const calculatePrice = (_items: any) => {
    let totalPrice_ = 0;
    //console.log("calculatePrice: ", items);

    if (_items) {
      _items &&
        _items?.forEach((item: any) => {
          const itemPrice = item.price * item.quantity;
          totalPrice_ += itemPrice;
        });
      setTotalPrice(totalPrice_);
    }
  };

  useEffect(() => {
    getDocuments();
    calculatePrice(items);
  }, [items]);

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Hesap Özeti</Text>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.labelTxt}>Tutar</Text>
          <Text style={styles.priceTxt}>₺ {totalPrice.toFixed(1)}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.labelTxt}>İndirim</Text>
          <Text style={styles.priceTxt}>₺ {discount}</Text>
        </View>
        <View style={styles.banner} />
        <View style={styles.wrapper}>
          <Text style={styles.labelTxt}>Toplam</Text>
          <Text style={styles.priceTxt}>
            ₺ {(totalPrice - discount).toFixed(1)}
          </Text>
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
    paddingVertical: 10,
    paddingHorizontal: 0,
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderWidth: 0.5,
    borderColor: 'gray',
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
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  labelTxt: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  priceTxt: {
    fontSize: 16,
    color: '#333333',
  },
  banner: {
    backgroundColor: '#66AE7B',
    height: 1,
    marginVertical: 10,
    width: '100%',
  },
});
