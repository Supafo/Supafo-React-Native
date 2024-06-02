import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {
  OrderHistoryComp,
  historyMocks,
} from '../../components/OrderHistoryComp';
import {icons, mocks} from '../../mocks/mocks';
import {FlatList} from 'react-native-gesture-handler';
import {IOrderHistoryComp} from '../../components/components.type';

export const OrderHistory: React.FC<IOrderHistoryComp> = () => {
  const renderItem = ({item}: any) => {
    return (
      <OrderHistoryComp
        datetime={item.datetime}
        more="Detaylar"
        price={item.price}
        moreIcon={
          <Image source={icons.moreIcon} style={{width: 10, height: 9}} />
        }
        orderStatus="Teslim edildi"
        tick={<Image source={icons.tick} style={{width: 12, height: 12}} />}
        bagIcon={
          <Image source={icons.bagIcon} style={{width: 27, height: 30}} />
        }
        name={item.name}
        star={<Image source={icons.star} style={{width: 8, height: 8}} />}
        again="Tekrarla"
        rate="Değerlendir"
      />
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header title="Geçmiş Siparişlerim" />
      <View>
        <FlatList
          data={historyMocks}
          renderItem={renderItem}
          scrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          contentContainerStyle={{}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
