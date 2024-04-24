import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export interface IOrderHistoryComp {
  datetime?: string;
  price?: number;
  orderStatus?: string;
  name?: string;
  more?: string;
  bagIcon?: any;
  rate?: string;
  again?: string;
  onPress?: () => void;
  moreIcon?: any;
}

export const historyMocks: IOrderHistoryComp[] = [
  {
    datetime: '26 Ağustos 2023 | 14:50',
    price: 300,
    name: 'Yemek süpriz paketi',
  },
  {
    datetime: '16 Ağustos 2023 | 19:50',
    price: 100,
    name: 'Yemek süpriz paketi',
  },
  {
    datetime: '31 Ağustos 2023 | 09:20',
    price: 500,
    name: 'Yemek süpriz paketi',
  },
];

export const OrderHistoryComp: React.FC<IOrderHistoryComp> = ({
  datetime,
  price,
  orderStatus,
  name,
  more,
  bagIcon,
  rate,
  again,
  onPress,
  moreIcon,
}) => {
  return (
    <View style={styles.root}>
      <Pressable style={styles.top}>
        <View style={styles.infoContainer}>
          <View style={styles.datetimeAndPrice}>
            <Text style={styles.datetimeText}>{datetime}</Text>
            <Text style={styles.priceText}>{`Toplam: ${price} TL`}</Text>
          </View>
          <View style={styles.moreTexticon}>
            <Text style={styles.moreText}>{more}</Text>
            {moreIcon}
          </View>
        </View>
      </Pressable>
      <View>
        <View>
          <Text>{orderStatus}</Text>
          {bagIcon}
          <Text>{name}</Text>
        </View>
        <View>
          <Pressable onPress={onPress}>
            <Text>{rate}</Text>
          </Pressable>
          <Pressable>
            <Text>{again}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: 'green',
    height: 130,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  top: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  datetimeAndPrice: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  datetimeText: {
    fontSize: 14,
    color: 'black',
  },
  priceText: {
    fontSize: 14,
    color: 'black',
  },
  moreText: {
    color: 'green',
    fontSize: 18,
  },
  moreTexticon: {
    flexDirection: 'row',
  },
});
