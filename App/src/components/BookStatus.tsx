import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  ArrowRightIcon,
  BookCompleted,
  BookDelivered,
  BookPreparing,
} from '../assets/images';
import {BookStatusType} from './components.type';
import {colors} from '../theme/colors';

export default function BookStatus(props: BookStatusType) {
  const renderStatus = () => {
    if (props.status === 'preparing') {
      return (
        <View style={styles.root}>
          <Image style={styles.leftImage} source={BookPreparing} />
          <Text style={styles.middleText}>Siparişiniz Hazırlanıyor</Text>
          <Image style={styles.rightIcon} source={ArrowRightIcon} />
        </View>
      );
    } else if (props.status === 'completed') {
      return (
        <View style={styles.root}>
          <Image style={styles.leftImage} source={BookCompleted} />
          <Text style={styles.middleText}>Siparişiniz Tamamlandı</Text>
          <Image style={styles.rightIcon} source={ArrowRightIcon} />
        </View>
      );
    } else if (props.status === 'delivered') {
      return (
        <View style={styles.root}>
          <Image style={styles.leftImage} source={BookDelivered} />
          <Text style={styles.middleText}>Siparişiniz Teslim Edildi</Text>
          <Image style={styles.rightIcon} source={ArrowRightIcon} />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <Pressable onPress={() => console.log('Pressed')}>
      {renderStatus()}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 63,
    backgroundColor: '#66AE7B',
    borderRadius: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftImage: {
    width: 45,
    height: 45,
  },
  middleText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.splashtext,
  },

  rightIcon: {
    width: 24,
    height: 24,
  },
});
