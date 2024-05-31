import React from 'react';
import OrderHeader from './components/OrderHeader';
import {View} from 'react-native';
import StepProgress from './components/StepProgress';
import OrderDelivered from './components/OrderDelivered';
import PreparingOrder from './components/PreparingOrder';
import OrderCompleted from './components/OrderCompleted';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';

export default function OrderDetailScreen() {
  const detail = useSelector(
    (state: RootState) => state.detailOfOrder.detailOfOrder,
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <OrderHeader />
      <StepProgress />
      {detail == 'PreparingOrder' ? (
        <PreparingOrder />
      ) : detail == 'OrderCompleted' ? (
        <OrderCompleted />
      ) : detail == 'OrderDelivered' ? (
        <OrderDelivered />
      ) : null}
    </View>
  );
}
