import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

const OrderDetailSheet = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [discount, setDiscount] = useState(100);

  const navigation = useNavigation();

  const userId = useSelector((state: RootState) => state.setUserId.id);

  const getDocuments = async () => {
    try {
      {/*
        const response = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${authToken}` }, // Replace with your auth token
      });* */}
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
          const itemPrice = item.discountPrice * item.quantity;
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
    <View style={[styles.main]}>
      <View style={styles.wrapper}>
        <Text style={styles.txt}>Tutar</Text>
        <Text style={styles.priceTxt}>
        ₺ {totalPrice > 0 && totalPrice?.toFixed(1)}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.txt}>İndirim</Text>
        <Text style={styles.priceTxt}>₺ {discount.toFixed(0)}</Text>
      </View>
      <View style={styles.banner} />
      <View style={styles.wrapper}>
        <Text style={styles.txt}>Toplam</Text>
        <Text style={styles.priceTxt}>
        ₺ {(totalPrice - discount).toFixed(1)}
        </Text>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('OnlinePaymentScreen', {item: items})
          }>
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
    borderTopStartRadius: moderateScale(25),
    borderTopEndRadius: moderateScale(25),
    padding: moderateScale(10),
    borderTopWidth: moderateScale(0.7),
    borderTopColor: '#D0D5DD',
    borderRightColor: '#D0D5DD',
    borderLeftColor: '#D0D5DD',
    borderRightWidth: moderateScale(0.7),
    borderLeftWidth: moderateScale(0.7),
    paddingTop:moderateScale(27.5),
  },
  wrapper: {
    flexDirection: 'row',
    padding: moderateScale(2.5),
    marginBottom: verticalScale(1),
  },
  txt: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#333333', // Txt Color
    paddingStart: moderateScale(7),
    fontWeight: '400',
  },
  priceTxt: {
    fontSize: moderateScale(18),
    color: '#333333',
    paddingEnd: moderateScale(7),
  },
  banner: {
    backgroundColor: '#66AE7B',
    height: moderateScale(1.5),
    marginStart: moderateScale(10),
    marginEnd: moderateScale(10),
    marginVertical: verticalScale(15),
  },
  btnWrapper: {
    alignItems: 'center',
    marginVertical: verticalScale(25),
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#66AE7B',
    padding: moderateScale(5),
    borderRadius: moderateScale(16),
    width: '95  %',
    marginTop:moderateScale(19),
  },
  btnTxt: {
    textAlign: 'center',
    color: '#FEFEFE',
    padding: moderateScale(5),
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: scale(-1)},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  shadow2: {
    shadowColor: '#000000',
    shadowOffset: {width: scale(10), height: scale(-3)},
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(15),
    elevation: 10, // For Android shadow
  },
});
