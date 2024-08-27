import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IOrderHistoryComp} from './components.type';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';


export const historyMocks: IOrderHistoryComp[] = [
  {
    datetime: '26 Ağustos 2023 | 14:50',
    price: 300,
    name: '1 adet sürpriz paket',
  },
  {
    datetime: '16 Ağustos 2023 | 19:50',
    price: 100,
    name: '1 adet sürpriz paket',
  },
  {
    datetime: '31 Ağustos 2023 | 09:20',
    price: 500,
    name: '1 adet sürpriz paket',
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
  const navigation = useNavigation();
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

      <View style={styles.divider}></View>

      <View style={styles.bottom}>
        <View style={styles.bottomLeft}>
          <View style={styles.orderStatusIcon}>
            {tick}
            <Text style={styles.orderText}>{orderStatus}</Text>
          </View>
          <View style={{marginLeft: scale(5)}}>{bagIcon}</View>

          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.rateAgain}>
          <Pressable
            style={{...styles.rateIcon, borderColor: '#FF9200'}}
            onPress={onPress}>
            {star}
            <Text style={styles.rate}>{rate}</Text>
          </Pressable>

          <Pressable
            style={{
              ...styles.rateIcon,
              borderColor: 'transparent',
              backgroundColor: '#66AE7B',
            }}>
            <Text style={styles.again}>{again}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: moderateScale(1),
    borderColor: '#66AE7B',
    marginTop: verticalScale(10),
    marginHorizontal: moderateScale(15),
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(10),
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  datetimeAndPrice: {
    flexDirection: 'column',
    gap: scale(1),
  },
  datetimeText: {
    fontSize: moderateScale(12),
    color: 'black',
  },
  priceText: {
    fontSize: moderateScale(12),
    color: 'black',
  },
  moreText: {
    fontSize: moderateScale(14),
    color: '#66AE7B',
    fontWeight: '500',
    marginBottom: verticalScale(2.5),
  },
  moreTexticon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(7.5),
  },
  orderStatusIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  bottom: {
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(7.5),
    flex: 1,
    width: '100%',
  },
  name: {
    fontSize: moderateScale(10),
    color: '#636363',
  },
  orderText: {
    color: '#66AE7B',
    fontSize: moderateScale(12),
    marginLeft: scale(1),
  },
  rateAgain: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  bottomLeft: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: scale(3),
    marginTop: moderateScale(5),
  },
  rateIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(4),
    borderColor: '#FF9200',
    gap: scale(5),
  },
  rate: {
    fontSize: moderateScale(12),
    color: '#FF9200',
    textAlign: 'center',
    fontWeight: '400',
  },
  again: {
    fontSize: moderateScale(12),
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
  },
  divider: {
    width: '94%',
    backgroundColor: '#66AE7B',
    height: scale(1.3),
  },
});
