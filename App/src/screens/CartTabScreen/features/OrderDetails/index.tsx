import React, {useEffect, useState} from 'react';
import OrderHeader from './components/OrderHeader';
import {View} from 'react-native';
import StepProgress from './components/StepProgress';
import OrderDelivered from './components/OrderDelivered';
import PreparingOrder from './components/PreparingOrder';
import OrderCompleted from './components/OrderCompleted';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import fireStore from '@react-native-firebase/firestore';
import Header from '../../../../components/Header';

export default function OrderDetailScreen() {
  const [status, setStatus] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const id = useSelector((state: RootState) => state.setUserId.id);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        {/*
           const response = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${authToken}` }, // Ensure authToken is defined
        });* */}
        const userId = id;
        if (!userId) {
          console.warn('User ID is not set');
          return;
        }

        const ordersCollection = fireStore()
          .collection(userId)
          .doc('orders')
          .collection('ordersList');
        const ordersSnapshot = await ordersCollection.get();

        if (ordersSnapshot.empty) {
          console.warn('No orders found');
          setIsOrdered(false);
          setStatus('null');
          return;
        }

        const orderDoc = ordersSnapshot.docs[0];
        const orderData = orderDoc.data();
        console.log(':', orderData);

        if (orderData) {
          setStatus(orderData.status || 'null');
          setIsOrdered(true);
        } else {
          setStatus('null');
          setIsOrdered(false);
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, [id, status]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header title={'Sipariş Detayı'}/>
      <StepProgress />
      {status == 'PreparingOrder' ? (
        <PreparingOrder />
      ) : status == 'OrderCompleted' ? (
        <OrderCompleted />
      ) : status == 'OrderDelivered' ? (
        <OrderDelivered />
      ) : null}
    </View>
  );
}
