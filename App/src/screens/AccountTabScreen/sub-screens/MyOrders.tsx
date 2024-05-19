import {View} from 'react-native';
import React from 'react';
import FlatItemList from '../components/FlatItemList';
import {myOrderData} from '../data/my-orders-data';
import Header from '../../../components/Header';

const MyOrders = () => {
  return (
    <View style={{backgroundColor: '#F5F5FA', flex: 1}}>
      <Header title={'Siparişlerim'} />
      <FlatItemList data={myOrderData} />
    </View>
  );
};

export default MyOrders;
