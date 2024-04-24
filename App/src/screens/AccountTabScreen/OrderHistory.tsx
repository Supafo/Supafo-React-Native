import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {
  IOrderHistoryComp,
  OrderHistoryComp,
  historyMocks,
} from '../../components/OrderHistoryComp';
import {icons, mocks} from '../../mocks/mocks';
import {FlatList} from 'react-native-gesture-handler';

export const OrderHistory: React.FC<IOrderHistoryComp> = ({item}: any) => {
  const renderItem = ({item}: any) => {
    return (
      <OrderHistoryComp
        // name={item.name}
        datetime={item.datetime}
        more="Detaylar"
        // again="Tekrarla"
        // orderStatus="Teslim edildi"
        price={item.price}
        moreIcon={<Image source={icons.moreIcon} />}
        // rate="Değerlendir"
        // bagIcon={<Image source={icons.bagIcon} />}
      />
    );
  };
  return (
    <View>
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
