import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DetailHeader from './components/DetailHeader';
import RestaurantInfoContainer from './components/RestaurantInfoContainer';
import PackageInfo from './components/PackageInfo';
import Label from './components/Label';
import AddCartContainer from './components/AddCartContainer';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import {useDispatch} from 'react-redux';
import {setOrderDetail} from '../../store/slices/orderDetail';

type RestaruantDetailProp = RouteProp<RootStackParamList, 'RestaurantDetail'>;

type Props = {
  route: RestaruantDetailProp;
};

const RestaurantDetail = ({route}: Props) => {
  const item = route.params.item;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrderDetail('null'));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <DetailHeader item={item} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantInfoContainer
          time={item?.time}
          rate={item?.rate}
          price={item?.price}
          discountPrice={item?.discountPrice}
          item={item}
          address={item.address}
        />
        <PackageInfo />
        <Label rate={item?.rate} />
      </ScrollView>
      <AddCartContainer item={item} />
    </View>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({});
