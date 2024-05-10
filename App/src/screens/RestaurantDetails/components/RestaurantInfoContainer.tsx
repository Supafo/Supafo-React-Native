import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../../theme/colors';

type Props = {};

const RestaurantInfoContainer = (props: Props) => {
  const packageInfo = ['Vejeteryan', 'Vegan', 'Glutensiz', 'Laktozsuz'];

  return (
    <View style={styles.main}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <View style={styles.row}>
            <SimpleLineIcons name={'handbag'} size={24} color={'#66AE7B'} />
            <Text style={styles.txt}>Sürpriz Paket</Text>
          </View>
          <View style={styles.row}>
            <Icon name={'clock-outline'} size={24} color={'#66AE7B'} />
            <Text style={styles.txt}>Bugün: 06:00 - 07:00</Text>
          </View>
          <View style={styles.row}>
            <Icon name={'star'} size={24} color={'green'} />
            <Text style={styles.txt}>4.9 (500+)</Text>
          </View>
        </View>
        <View style={styles.cardPrice}>
          <View style={styles.line}></View>
          <Text style={[styles.textPriceFirst]}>110.90 TL</Text>
          <Text style={styles.textPrice}>49.99 TL</Text>
        </View>
      </View>
      <Pressable
        style={[styles.row, {justifyContent: 'space-between', marginTop: 12}]}>
        <SimpleLineIcons name={'location-pin'} size={24} color={'#66AE7B'} />
        <View style={{flex: 1, paddingStart: 10}}>
          <Text style={{fontSize: 17, color: '#333333'}}>Restoran Adresi </Text>
          <Text style={styles.labelTxt}>Mağaza hakkında daha fazla bilgi</Text>
        </View>
        <SimpleLineIcons name={'arrow-right'} size={16} color={'black'} />
      </Pressable>
    </View>
  );
};

export default RestaurantInfoContainer;

const styles = StyleSheet.create({
  main: {
    margin: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    padding: 5,
    color: '#333333',
  },
  labelTxt: {
    color: '#333333',
    fontSize: 12,
  },
  cardPrice: {
    padding: 10,
  },
  textPrice: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '600',
  },
  textPriceFirst: {
    fontSize: 14,
    fontWeight: '700',
  },
  line: {
    position: 'absolute',
    top: 18,
    left: 12,
    width: 41,
    height: 0,
    borderWidth: 1.5,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{rotate: '160.81deg'}],
    zIndex: 2,
  },
});
