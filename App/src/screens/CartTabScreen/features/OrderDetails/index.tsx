import React from 'react';
import OrderHeader from './components/OrderHeader';
import {View} from 'react-native';
import StepProgress from './components/StepProgress';
import OrderDelivered from './components/OrderDelivered';

export default function OrderDetailScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <OrderHeader />
      <StepProgress />
      <OrderDelivered />
    </View>
  );
}
