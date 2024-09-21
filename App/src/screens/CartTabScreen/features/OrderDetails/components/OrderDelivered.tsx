import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';
import {useDispatch, useSelector} from 'react-redux';
import {confirm} from '../../../../../store/slices/isCartConfirmed';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../../../navigation/routes';
import {
  setIsOrdered,
  setOrderDetail,
} from '../../../../../store/slices/orderDetail';
import fireStore from '@react-native-firebase/firestore';
import {RootState} from '../../../../../store/store';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const OrderDelivered = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.setUserId.id);

  const [orderItem, setOrderItem] = useState<any>();
  const [item, setItem] = useState();
  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        {/*
          const response = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${authToken}` }, // Ensure authToken is defined
        });* */}
        const snapshot = await fireStore()
          .collection(userId)
          .doc('orders')
          .collection('ordersList')
          .limit(1)
          .get();

        if (!snapshot.empty) {
          const doc = snapshot.docs[0].data();
          setOrderItem(doc);
        }
      } catch (error) {
        console.error('Veri alırken bir hata oluştu:', error);
      }
    };

    fetchOrderItem();
  }, [userId, orderItem]);

  const handlePress = () => {
    const item = {
      address: 'Ankara, Türkiye',
      discountPrice: '99.9',
      distance: '30',
      id: '06T7Y4Elbtsp6mkMhfHH',
      isFavorite: true,
      isNew: true,
      lasProduct: 'Tükendi',
      name: 'Burger King',
      price: 110.9,
      quantity: 1,
      rate: 4.9,
      time: '06.00-07.00',
    };

    dispatch(confirm(false));
    dispatch(setIsOrdered(true));
    navigation.navigate(routes.RATINGS, { item });
    dispatch(setOrderDetail('null'));
  };

  return (
    <View style={styles.main}>
      <OrderDetailsContainer title={'✓ Sipariş Teslim Edildi'} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../../assets/images/bigicon.png')}
          style={styles.logo}
        />
        <Text style={styles.labelTxt}>
          Bizi tercih ettiğiniz için {'\nteşekkür ederiz..'}
        </Text>
      </View>
      <View style={{marginTop: verticalScale(20), width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {handlePress}}>
          <Text style={styles.btnTxt}>Sürpriz Paketi Değerlendir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDelivered;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: moderateScale(10),
    height: '100%',
  },
  logoContainer: {
    backgroundColor: '#fcfcfc',
    borderRadius: moderateScale(999),
    margin: moderateScale(10),
    height: scale(190),
    width: scale(190),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  logo: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  labelTxt: {
    fontSize: moderateScale(12),
    color: '#FF9200',
    textAlign: 'center',
    padding: moderateScale(10),
  },
  btn: {
    backgroundColor: '#66AE7B',
    padding: moderateScale(5),
    borderRadius: moderateScale(15),
    width: '90%',
    marginTop: verticalScale(20),
  },
  btnTxt: {
    fontSize: moderateScale(16),
    color: 'white',
    padding: moderateScale(5),
    textAlign: 'center',
  },
  shadow_android: {},
  shadow_ios: {},
  /* SHADOW IOS_ANDROID EKLE */
});
