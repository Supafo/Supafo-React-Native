import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../../theme/colors';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../navigation/routes';

type Props = {
  time: string;
  rate: number;
  price: number;
  discountPrice: number;
  item: any;
};

const RestaurantInfoContainer = ({
  time,
  rate,
  price,
  discountPrice,
  item,
}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={[styles.container, styles.shadow]}>
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
            <Text style={styles.txt}>{rate} (500+)</Text>
          </View>
        </View>
        <View style={styles.cardPrice}>
          <View style={styles.line}></View>
          <Text style={[styles.textPriceFirst]}>₺ {price}</Text>
          <Text style={styles.textPrice}>₺ {discountPrice}</Text>
        </View>
      </View>
      <Pressable style={[styles.pressable]}>
        <SimpleLineIcons name={'location-pin'} size={20} color={'#66AE7B'} />
        <View style={{flex: 1, paddingStart: 10}}>
          <Text style={styles.labelTitle}>Restoran Adresi </Text>
          <Text style={styles.labelTxt}>Mağaza hakkında daha fazla bilgi</Text>
        </View>
        <SimpleLineIcons name={'arrow-right'} size={16} color={'black'} />
      </Pressable>
      {/* <Pressable
        style={[styles.pressable, styles.shadow]}
        onPress={() => navigation.navigate(routes.RATINGS, {item: item})}>
        <SimpleLineIcons name={'location-pin'} size={20} color={'#66AE7B'} />
        <View style={{flex: 1, paddingStart: 10}}>
          <Text style={styles.labelTitle}>Yorum Yaz </Text>
        </View>
        <SimpleLineIcons name={'arrow-right'} size={16} color={'black'} />
      </Pressable> */}
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
    fontSize: 17,
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
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.25,
    shadowRadius: 0, // Equivalent to Blur in the given spec
    elevation: 2,
  },
  pressable: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: 'gray',
  },
});
