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
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const OrderHistory: React.FC<IOrderHistoryComp> = () => {
  const renderItem = ({item}: any) => {
    return (
      <OrderHistoryComp
        datetime={item.datetime}
        more="Detaylar"
        price={item.price}
        moreIcon={
          <Image source={icons.moreIcon} style={{width: scale(10.5), height: scale(16.5), borderWidth:moderateScale(1),borderRadius:999}} />
        }
        orderStatus="Teslim edildi"
        tick={<Image source={icons.tick} style={{width: scale(10), height: scale(7)}} />}
        bagIcon={
          <Image source={icons.bagIcon} style={{width: scale(27), height: scale(30)}} />
        }
        name={item.name}
        star={<Image source={icons.star} style={{width: scale(8), height: scale(8)}} />}
        again="Tekrarla"
        rate="Değerlendir"
      />
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header title="Geçmiş Siparişlerim" />
      <View style={{backgroundColor: 'white'}}>
        <FlatList
          data={historyMocks}
          renderItem={renderItem}
          scrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: scale(5)}} />
          )}
          contentContainerStyle={{marginTop: moderateScale(10)}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
