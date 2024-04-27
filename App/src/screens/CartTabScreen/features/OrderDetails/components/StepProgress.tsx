import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StepProgress = () => {
  return (
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <View style={[styles.container]}>
          <View style={[styles.iconContainer]}>
            <Icon name="timer-sand" size={30} color={'white'} />
          </View>
          <View style={styles.banner} />
        </View>
        <Text style={[styles.txt, {textAlign: 'left'}]}>
          Sipariş{'\nHazırlanıyor'}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.banner} />
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../../assets/images/order-detail-icon.png')}
            />
          </View>
          <View style={styles.banner} />
        </View>
        <Text style={[styles.txt, {textAlign: 'center'}]}>
          Sipariş{'\nTamamlandı'}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View style={[styles.container]}>
          <View style={styles.banner} />
          <View style={[styles.iconContainer]}>
            <Icon name="check" size={30} color={'white'} />
          </View>
        </View>
        <Text style={[styles.txt, {textAlign: 'right'}]}>
          Sipariş{'\nTeslim Edildi'}
        </Text>
      </View>
    </View>
  );
};

export default StepProgress;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginStart: 20,
    marginEnd: 20,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  wrapper: {
    flex: 1,
  },
  txt: {
    fontSize: 14,
    paddingStart: 5,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 80,
    backgroundColor: '#66AE7B',
    marginBottom: 4,
  },
  banner: {
    color: '#66AE7B',
    flex: 1,
    backgroundColor: '#66AE7B',
    height: 2.5,
  },
});
