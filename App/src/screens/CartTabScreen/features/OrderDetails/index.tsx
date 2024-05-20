import React from 'react';
import OrderHeader from './components/OrderHeader';
import {View} from 'react-native';
import StepProgress from './components/StepProgress';
import OrderDelivered from './components/OrderDelivered';
import PreparingOrder from './components/PreparingOrder';
import OrderCompleted from './components/OrderCompleted';

export default function OrderDetailScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'space-between', backgroundColor:'white'}}>
      <OrderHeader />
      <StepProgress />
      {/* <PreparingOrder /> */}
      <OrderDelivered />
      {/* <OrderCompleted /> */}
    </View>
  );
}
