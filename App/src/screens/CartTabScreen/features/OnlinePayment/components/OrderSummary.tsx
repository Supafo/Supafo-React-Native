import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';
import responsiveScale from '../../../../../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;
const OrderSummary = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [discount, setDiscount] = useState(100);

  const userId = useSelector((state: RootState) => state.setUserId.id);

  const getDocuments = async () => {
    {/*const response = await axios.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${authToken}`, // Send the token in Authorization header
        },* */}
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
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(10),
    paddingHorizontal: 0,
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: moderateScale(15),
    borderTopEndRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: '#D0D5DD',
  },
  main: {
    marginStart: moderateScale(20),
    marginEnd: moderateScale(20),
  },
  title: {
    color: '#333333',
    fontSize: moderateScale(14),
    fontWeight: '500',
    padding: moderateScale(5),
    marginStart:moderateScale(-5.25),
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
    paddingHorizontal: moderateScale(20),
  },
  labelTxt: {
    flex: 1,
    fontSize: moderateScale(12),
    color: '#333333',
  },
  priceTxt: {
    fontSize: moderateScale(12),
    color: '#333333',
  },
  banner: {
    backgroundColor: '#66AE7B',
    height: scale(1),
    marginVertical: moderateScale(7.5),
    width: '100%',
  },
});
