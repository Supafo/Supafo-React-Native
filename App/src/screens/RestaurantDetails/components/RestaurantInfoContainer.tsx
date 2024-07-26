import {PixelRatio, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../../theme/colors';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

type Props = {
  time: string;
  rate: number;
  price: number;
  discountPrice: number;
  item: any;
  address: any;
};

const RestaurantInfoContainer = ({
  time,
  rate,
  price,
  discountPrice,
  item,
  address,
}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={[styles.container]}>
        <View style={{marginEnd: 10}}>
          <View style={styles.row}>
            <SimpleLineIcons
              style={{
                paddingStart: 10,
              }}
              name={'handbag'}
              size={18}
              color={'#66AE7B'}
              // paddingStart={10}
            />
            <Text style={styles.txt}>Sürpriz Paket</Text>
          </View>
          <View style={styles.row}>
            <Icon
              style={{
                paddingStart: 10,
              }}
              name={'clock-outline'}
              size={18}
              color={'#66AE7B'}
            />
            <Text style={styles.txt}>Bugün: {time}</Text>
          </View>
          <View style={styles.row}>
            <Icon name={'star'} size={18} color={'green'} paddingStart={10} />
            <Text style={styles.txt}>{rate} (574)</Text>
          </View>
        </View>
        <View style={styles.cardPrice}>
          <View style={styles.line}></View>
          <Text style={[styles.textPriceFirst]}>₺ {price}</Text>
          <Text style={styles.textPrice}>₺ {discountPrice}</Text>
        </View>
      </View>
      <Pressable style={styles.pressable}>
        <SimpleLineIcons name={'location-pin'} size={20} color={'#66AE7B'} />
        <View style={{flex: 1, paddingStart: 10}}>
          <Text style={styles.labelTitle}>{address}</Text>
          <Text style={styles.labelTxt}>Mağaza hakkında daha fazla bilgi</Text>
        </View>
        <SimpleLineIcons name={'arrow-right'} size={16} color={'black'} />
      </Pressable>
    </View>
  );
};

export default RestaurantInfoContainer;

const styles = StyleSheet.create({
  main: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  txt: {
    color: '#333333',
    paddingStart: 6,
  },
  labelTxt: {
    color: '#333333',
    fontSize: 12,
  },
  labelTitle: {fontSize: 17, color: '#333333', fontWeight: '600'},
  cardPrice: {
    padding: 10,
    justifyContent: 'center',
  },
  textPrice: {
    fontSize: 19,
    color: '#333333',
    fontWeight: '600',
  },
  textPriceFirst: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    color: '#333333',
  },
  line: {
    position: 'absolute',
    top: scale(26),
    left: scale(20),
    width: scale(28),
    height: 0,
    borderWidth: 1.5,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{rotate: '160.81deg'}],
    zIndex: 2,
  },
  pressable: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
