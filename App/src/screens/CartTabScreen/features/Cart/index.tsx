import React from 'react';
import {View} from 'react-native';
import CartHeader from './components/CartHeader';
import CartItems from './components/CartItems';
import OrderDetailSheet from './components/OrderDetailSheet';

export default function CartTabScreen() {
  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <CartHeader />
      <View style={{flex: 1}}>
        <CartItems />
      </View>
      <OrderDetailSheet />
    </View>
  );
}
