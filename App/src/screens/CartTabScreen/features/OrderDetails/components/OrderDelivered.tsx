import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';
import {useDispatch, useSelector} from 'react-redux';
import {confirm} from '../../../../../store/slices/isCartConfirmed';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../../../navigation/routes';
import {
  setIsOrdered,
  setOrderDetail,
} from '../../../../../store/slices/orderDetail';
import fireStore from '@react-native-firebase/firestore'
import { RootState } from '../../../../../store/store';

const OrderDelivered = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.setUserId.id);

  const [orderItem, setOrderItem] = useState(null);

  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
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
  console.log(orderItem.items[0], "MSNDmöabD");
  

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
      <View style={{marginTop: 20, width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            dispatch(confirm(false));
            dispatch(setIsOrdered(true));
            navigation.navigate(routes.RATINGS, {
              item: orderItem.items[0]
            });
            dispatch(setOrderDetail('null'));
          }}>
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
    marginTop: 30,
    height: '100%',
  },
  logoContainer: {
    backgroundColor: '#fcfcfc',
    borderRadius: 100,
    margin: 10,
    height: 190,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
    width: '90%',
    marginTop: 20,
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
