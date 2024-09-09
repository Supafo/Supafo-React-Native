import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {LocationInputType} from './components.type';
import {ArrowBottomIcon, LocationIcon} from '../assets/images';
import ArrowDown from '../assets/images/bottombaricons/arrow-down.svg';
import {colors} from '../theme/colors';
import responsiveScale from '../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

export const LocationInput = (props: LocationInputType) => {
  return (
    <View style={styles.root}>
      <View style={styles.allInput}>
        <View style={styles.input}>
          <View style={styles.left}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={LocationIcon} />
          </View>
            
            <View style={styles.content}>
              <Text style={styles.titleTop}>Seçilen konum</Text>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.titleBottom}>{props.distance} km içinde</Text>
            </View>
          </View>
          <ArrowDown />
          {/* <Image source={ArrowBottomIcon} style={styles.right} /> */}
        </View>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.splashtext,
    alignItems: 'center',
    textAlign: 'center',
  },
  allInput: {
    width: screenWidth,
    backgroundColor: colors.splashtext,
    borderTopWidth: moderateScale(1),
    borderBottomWidth: moderateScale(1),
    borderTopColor: colors.strokeColor,
    borderBottomColor: colors.strokeColor,
    paddingHorizontal: moderateScale(34),
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12.5),
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: moderateScale(1),
    paddingVertical: moderateScale(0.75),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    width: scale(18),
    height: verticalScale(20),
    justifyContent:'center',
  },
  titleTop: {
    fontWeight: '400',
    fontSize: moderateScale(7.5),
    color: colors.placeholder,
  },
  title: {
    fontWeight: '500',
    fontSize: moderateScale(11),
    color: '#333333',
  },
  titleBottom: {
    fontWeight: '700',
    fontSize: moderateScale(7.5),
    color: colors.placeholder,
  },
  right: {
    justifyContent: 'flex-end',
    width: scale(21),
    height: verticalScale(12),
  },
});
