import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CartHeader from './components/CartHeader';
import CartItems from './components/CartItems';
import OrderDetailSheet from './components/OrderDetailSheet';
import firestore from '@react-native-firebase/firestore';
import IsCartEmpty from './components/IsCartEmpty';
import auth from '@react-native-firebase/auth';

export default function CartTabScreen() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
      } else {
        setUser(null);
        setUserId('');
      }
    });

    return () => unsubscribe(); 
  }, []);
  
  useEffect(() => {
    const getDocuments = async () => {
      if (!userId) {
        console.warn('User ID is not available yet');
        return;
      }

      try {
        const querySnapshot = await firestore().collection(userId).get();
        const docs = [];

        querySnapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() });
        });

        setItems(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    getDocuments();
  }, [userId]); // Only run when userId changes  

  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <CartHeader />
      <View style={{ flex: 1 }}>
        {items.length !== 0 ? (
          <View style={{ justifyContent: 'space-between', flex: 1 }}>
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
