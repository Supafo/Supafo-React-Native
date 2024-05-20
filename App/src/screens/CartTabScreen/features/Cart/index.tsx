import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import CartHeader from './components/CartHeader';
import CartItems from './components/CartItems';
import OrderDetailSheet from './components/OrderDetailSheet';
import fireStore from '@react-native-firebase/firestore';
import IsCartEmpty from './components/IsCartEmpty';

export default function CartTabScreen() {
  const [items, setItems] = useState([]);

  const getDocuments = async () => {
    try {
      const querySnapshot = await fireStore().collection('cart').get();
      const docs: any = [];

      querySnapshot.forEach(doc => {
        docs.push({id: doc.id, ...doc.data()});
      });

      //console.log('Documents:', docs);
      setItems(docs);
      return docs;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  useEffect(() => {
    getDocuments();
  }, [items]);

  return (
    <View style={{justifyContent: 'space-between', flex: 1, backgroundColor:'white'}}>
      <CartHeader />
      <View style={{flex: 1}}>
        {items.length !== 0 ? (
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <CartItems />
            <OrderDetailSheet />
          </View>
        ) : (
          <IsCartEmpty />
        )}
      </View>
    </View>
  );
}
