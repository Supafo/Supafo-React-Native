import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DetailHeader from './components/DetailHeader';
import RestaurantInfoContainer from './components/RestaurantInfoContainer';
import PackageInfo from './components/PackageInfo';
import Label from './components/Label';
import AddCartContainer from './components/AddCartContainer';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';

type RestaruantDetailProp = RouteProp<RootStackParamList, 'RestaurantDetail'>;

type Props = {
  route: RestaruantDetailProp;
};

const RestaurantDetail = ({route}: Props) => {
  const item = route.params;

  return (
    <View style={{flex: 1}}>
      <DetailHeader item={item} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantInfoContainer
          time={item.time}
          rate={item.rate}
          price={item.price}
          discountPrice={item.discountPrice}
        />
        <PackageInfo />
        <Label rate={item.rate} />
      </ScrollView>
      <AddCartContainer item={item} />
    </View>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({});
