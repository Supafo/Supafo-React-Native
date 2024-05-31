import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';

const StepProgress = () => {
  const detail = useSelector(
    (state: RootState) => state.detailOfOrder.detailOfOrder,
  );
  console.log(detail);

  return (
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <View style={[styles.container]}>
          <View
            style={[
              styles.iconContainer,
              {opacity: detail == 'PreparingOrder' ? 1 : 0.6},
            ]}>
            <Icon name="timer-sand" size={24} color={'white'} />
          </View>
          <View style={styles.banner} />
          <Text style={[styles.txt, {textAlign: 'center', marginStart: 5}]}>
            Sipariş
            {'\nHazırlanıyor'}
          </Text>
        </View>
      </View>

      <View style={styles.banner} />

      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.banner} />
          <View
            style={[
              styles.iconContainer,
              {opacity: detail == 'OrderCompleted' ? 1 : 0.6},
            ]}>
            <Image
              source={require('../../../../../assets/images/order-detail-icon.png')}
              style={{width: 24, height: 24}}
            />
          </View>
          <View style={styles.banner} />
          <Text style={[styles.txt, {textAlign: 'center'}]}>
            Sipariş{'\nTamamlandı'}
          </Text>
        </View>
      </View>

      <View style={styles.banner} />

      <View style={styles.wrapper}>
        <View style={[styles.container]}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={[
                styles.iconContainer,
                {opacity: detail == 'OrderDelivered' ? 1 : 0.6},
              ]}>
              <Icon name="check" size={24} color={'white'} />
            </View>
          </View>
          <Text style={[styles.txt, {textAlign: 'center', marginEnd: 10}]}>
            Sipariş{'\nTeslim Edildi'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StepProgress;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    fontSize: 13,
    color: '#000000',
    width: 80,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: '#66AE7B',
    marginBottom: 4,
  },
  banner: {
    color: '#66AE7B',
    backgroundColor: '#66AE7B',
    height: 2.5,
    bottom: 24,
    flex: 1,
    paddingHorizontal: 28,
  },
});
