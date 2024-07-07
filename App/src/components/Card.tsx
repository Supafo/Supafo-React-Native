import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import DinnerPng from '../assets/images/kahvalti.png';
import StarIcon from '../assets/images/starIcon.png';
import {colors} from '../theme/colors';
import {ICardLarge} from '../components/components.type';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;
const largeCardWidth = (screenWidth * 95) / 100;

export const Card: React.FC<ICardLarge> = ({
  count,
  distance,
  price,
  time,
  url,
  favoriteScreen,
  discountPrice,
}) => {
  return (
    <View
      style={[
        styles.card,
        favoriteScreen ? {width: '95%'} : {width: largeCardWidth},
      ]}>
      <Image
        source={require('../assets/images/CardBg.jpg')}
        style={styles.image}
      />
      <View style={styles.cardTop}>
        <View style={styles.lastNumber}>
          <Text style={styles.text}>Son {count}</Text>
        </View>

        <View style={styles.favoriteIconContainer}>
          <View style={styles.favoriteIcon}>
            <AntDesign
              name="hearto"
              size={moderateScale(12)}
              color={colors.openOrange}
            />
          </View>
          <View style={{...styles.favoriteIcon, marginLeft: scale(5)}}>
            <Feather
              name="share-2"
              size={moderateScale(12)}
              color={colors.greenColor}
            />
          </View>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.bottomLeft}>
          <View style={styles.cardBottomDinner}>
            <Image style={styles.dinnerPng} source={DinnerPng} />
            <Text style={styles.dinnertext}>Kahvaltılık</Text>
          </View>

          <View style={styles.timebg}>
            <Text style={styles.time}>Bugün: {time}</Text>
          </View>

          <View style={styles.starandKm}>
            <Image style={styles.star} source={StarIcon} />
            <Text style={styles.kmText}>
              {4.9} | {distance} km
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <View style={styles.cardPrice}>
            {/* <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: moderateScale(2),
              }}>
              <View style={styles.line}></View>
              <Text style={[styles.textPriceFirst]}>110.90 TL</Text>
            </View> */}
            <Text style={styles.textPrice}>₺ {discountPrice}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    height: moderateScale(148),
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
    paddingHorizontal: verticalScale(10),
  },
  bottomLeft: {
    width: scale(130),
  },
  cardBottomDinner: {
    flexDirection: 'row',
    width: moderateScale(157.5),
    alignItems: 'center',
    marginBottom: verticalScale(6.5),
  },
  cardPrice: {
    position: 'relative',
    width: moderateScale(75),
    bottom: 0,
    alignItems: 'flex-end',
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.openGreen,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
  },
  text: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: moderateScale(11),
    fontWeight: '600',
    alignSelf: 'center',
    lineHeight: moderateScale(14),
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
    opacity: 0.6,
  },
  textPrice: {
    fontSize: moderateScale(15),
    color: colors.tabBarBg,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  textPriceFirst: {
    color: '#D0D5DD',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  line: {
    position: 'absolute',
    width: moderateScale(50),
    borderWidth: 1,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{rotate: '170.81deg'}],
    zIndex: 2,
    borderRadius: 15,
  },
  dinnerPng: {
    width: moderateScale(23),
    borderRadius: 20,
    height: moderateScale(23),
    backgroundColor: colors.tabBarBg,
  },
  dinnertext: {
    fontWeight: '600',
    color: colors.cardText,
    marginLeft: scale(5),
    fontSize: moderateScale(16),
    textAlign: 'center',
    textShadowColor: '#333333',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1.5,
      height: 0.5,
    },
  },
  favoriteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    backgroundColor: 'white',
    padding: scale(4),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  kmText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.tabBarBg,
    marginLeft: scale(4),
  },
  starandKm: {
    flexDirection: 'row',
    paddingTop: verticalScale(4),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  star: {
    width: scale(10),
    height: scale(10),
    tintColor: colors.openGreen,
  },
  time: {
    fontSize: moderateScale(11),
    color: colors.tabBarBg,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScale(14),
  },
  timebg: {
    backgroundColor: colors.openGreen,
    borderRadius: 25,
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(8),
    alignSelf: 'flex-start',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: verticalScale(10),
    marginTop: moderateScale(7),
  },
});
