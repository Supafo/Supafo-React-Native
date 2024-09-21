import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import CartHeader from './components/CartHeader';
import CartItems from './components/CartItems';
import OrderDetailSheet from './components/OrderDetailSheet';
import firestore from '@react-native-firebase/firestore';
import IsCartEmpty from './components/IsCartEmpty';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';

export default function CartTabScreen() {
  const [items, setItems] = useState([]);

  const userId = useSelector((state: RootState) => state.setUserId.id);

  useEffect(() => {
    const getDocuments = async () => {
      if (!userId) {
        console.warn('User ID is not available yet');
        return;
      }

      try {
        {/**const response = await axios.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send token in Authorization header
          }, */}
        const querySnapshot = await firestore()
          .collection(userId)
          .doc('cart')
          .collection('items')
          .get();
        const docs = [];

        querySnapshot.forEach(doc => {
          docs.push({id: doc.id, ...doc.data()});
        });

        setItems(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    getDocuments();
  }, [userId, items]);

  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <CartHeader />
      <View style={{flex: 1}}>
        {items.length !== 0 ? (
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <CartItems items={items} />
            <OrderDetailSheet />
          </View>
        ) : (
          <IsCartEmpty />
        )}
      </View>
    </View>
  );
}
