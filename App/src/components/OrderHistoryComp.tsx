import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IOrderHistoryComp} from './components.type';

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
  tick,
  star,
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
      <View style={styles.bottom}>
        <View style={styles.bottomLeft}>
          <View style={styles.orderStatusIcon}>
            {tick}
            <Text style={styles.orderText}>{orderStatus}</Text>
          </View>
          {bagIcon}
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.rateAgain}>
          <Pressable style={styles.rateIocn} onPress={onPress}>
            {star}
            <Text style={styles.rate}>{rate}</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.again}>{again}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#66AE7B',
    height: 130,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  top: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#66AE7B',
    padding: 10,
    borderRadius: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  datetimeAndPrice: {
    flexDirection: 'column',
    gap: 1,
  },
  datetimeText: {
    fontSize: 10,
    color: 'black',
  },
  priceText: {
    fontSize: 10,
    color: 'black',
  },
  moreText: {
    color: 'green',
    fontSize: 12,
  },
  moreTexticon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatusIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bottom: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 10,
    color: '#636363',
  },
  orderText: {
    color: '#66AE7B',
    fontSize: 10,
  },
  rateAgain: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  bottomLeft: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 5,
  },
  rateIocn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF9200',
    borderRadius: 15,
    width: 85,
    height: 25,
    textAlign: 'center',
    gap: 5,
  },
  rate: {fontSize: 10, color: '#FF9200'},
  again: {
    fontSize: 10,
    borderRadius: 15,
    backgroundColor: '#66AE7B',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: 85,
    height: 25,
    textAlign: 'center', // Add this line to center-align the text
    lineHeight: 25,
  },
});
