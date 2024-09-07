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
import responsiveScale from '../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

export default function BookStatus(props: BookStatusType) {
  const renderStatus = () => {
    switch (props.status) {
      case 'preparing':
        return (
          <View style={styles.root}>
            <Image style={styles.leftImage} source={BookPreparing} />
            <Text style={styles.middleText}>Siparişiniz Hazırlanıyor</Text>
            <Image style={styles.rightIcon} source={ArrowRightIcon} />
          </View>
        );
      case 'completed':
        return (
          <View style={styles.root}>
            <Image style={styles.leftImage} source={BookCompleted} />
            <Text style={styles.middleText}>Siparişiniz Tamamlandı</Text>
            <Image style={styles.rightIcon} source={ArrowRightIcon} />
          </View>
        );
      case 'delivered':
        return (
          <View style={styles.root}>
            <Image style={styles.leftImage} source={BookDelivered} />
            <Text style={styles.middleText}>Siparişiniz Teslim Edildi</Text>
            <Image style={styles.rightIcon} source={ArrowRightIcon} />
          </View>
        );
      case 'null':
        return null;
      default:
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
    width: '90%',
    height: verticalScale(66),
    backgroundColor: '#66AE7B',
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftImage: {
    width: scale(50),
    height: verticalScale(48),
  },
  middleText: {
    fontSize: moderateScale(15.5),
    fontWeight: '500',
    lineHeight: moderateScale(20),
    color: colors.splashtext,
    marginEnd: moderateScale(30),
  },

  rightIcon: {
    width: scale(24),
    height: verticalScale(24),
  },
});
