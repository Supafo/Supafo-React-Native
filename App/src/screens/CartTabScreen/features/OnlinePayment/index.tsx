import React from 'react';
import {View} from 'react-native';
import PaymentHeader from './components/PaymentHeader';
import PaymentDetails from './components/PaymentDetails';

export default function OnlinePaymentScreen() {
  return (
    <View style={{flex: 1, backgroundColor:'white'}}>
      <PaymentHeader />
      <PaymentDetails />
    </View>
  );
}
