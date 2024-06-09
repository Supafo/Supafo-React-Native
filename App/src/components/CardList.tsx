import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ICardList} from './components.type';
import {colors} from '../theme/colors';
import {BurgerKingListImg} from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const CardList: React.FC<ICardList> = ({
  name,
  time,
  discountPrice,
  price,
  rate,
  lastProduct,
  distance,
  isNew,
  isFavorite,
}) => {
  return (
    <View style={styles.card}>
      <Image source={BurgerKingListImg} style={styles.image} />
      <View style={styles.cardTop}>
        <View style={styles.lastNumber}>
          {lastProduct !== 'Tükendi' ? (
            <Text
              style={[styles.headerTxt, {backgroundColor: colors.greenColor}]}>
              Son {lastProduct}
            </Text>
          ) : (
            <Text
              style={[styles.headerTxt, {backgroundColor: colors.openOrange}]}>
              Tükendi
            </Text>
          )}
          {isNew ? (
            <View style={styles.newContainer}>
              <Text style={[styles.headerTxt, {color: colors.greenColor}]}>
                Yeni
              </Text>
            </View>
          ) : null}
        </View>

        {isFavorite ? (
          <View style={styles.favoriteIconContainer}>
            <Icon name={'heart'} color={'orange'} size={moderateScale(13)} />
          </View>
        ) : (
          <View style={styles.favoriteIconContainer}>
            <Icon
              name={'heart-outline'}
              color={'orange'}
              size={moderateScale(13)}
            />
          </View>
        )}
      </View>

      <View style={styles.label}>
        <View style={styles.bottomLeft}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/burger-king-logo.png')}
            />
            <Text style={styles.name}>{name}</Text>
          </View>

          <View style={styles.timeWrapper}>
            <Text style={styles.timeTxt}>Bugün: {time}</Text>
          </View>

          <View style={styles.starandKm}>
            <Image
              style={styles.star}
              source={require('../assets/images/star.png')}
            />
            <View style={{marginLeft: scale(4), flexDirection: 'row'}}>
              <Text style={styles.labelText}>{rate} | </Text>
              <Text style={styles.labelText}>{distance} km</Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <View style={styles.cardPrice}>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: moderateScale(2),
              }}>
              <View style={styles.line}></View>
              <Text style={[styles.textPriceFirst]}>{price}TL</Text>
            </View>

            <Text style={styles.textPrice}>{discountPrice} TL</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  card: {
    marginVertical: verticalScale(2),
    backgroundColor: 'black',
    resizeMode: 'cover',
    height: moderateScale(148),
    borderRadius: 15,
    width: moderateScale(250),
    justifyContent: 'space-between',
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: moderateScale(10),
    paddingHorizontal: verticalScale(10),
  },
  bottomLeft: {},
  logoContainer: {
    flexDirection: 'row',
    width: moderateScale(157.5),
    marginBottom: verticalScale(2.5),
    alignItems:'center',
  },
  cardPrice: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  headerTxt: {
    color: colors.splashtext,
    fontSize: moderateScale(11),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(2),
    fontWeight: '600',
    borderRadius: 10,
  },
  newContainer: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: scale(5),
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
    opacity: 0.6,
  },
  textPrice: {
    fontSize: moderateScale(12),
    color: colors.tabBarBg,
    fontWeight: '700',
  },
  textPriceFirst: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: colors.tabBarBg,
  },
  line: {
    position: 'absolute',
    width: moderateScale(41),
    borderWidth: 0.7,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{rotate: '170.81deg'}],
    zIndex: 2,
    borderRadius: 15,
  },
  logo: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: 20,
    backgroundColor: colors.tabBarBg,
  },
  name: {
    fontWeight: '600',
    color: colors.cardText,
    marginLeft: scale(5),
    fontSize: moderateScale(14),
  },
  favoriteIconContainer: {
    alignItems: 'center',
    padding: scale(4),
    backgroundColor: 'white',
    borderRadius: 100,
  },
  ShareIcon: {
    width: 26,
    height: 26,
  },
  labelText: {
    textAlign: 'center',
    fontSize: moderateScale(10),
    fontWeight: '400',

    color: colors.tabBarBg,
  },
  starandKm: {
    flexDirection: 'row',
    paddingTop: verticalScale(5),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  star: {
    width: scale(10),
    height: scale(10),
    tintColor: colors.openGreen,
  },
  timeTxt: {
    fontSize: moderateScale(9),
    color: colors.tabBarBg,
    fontWeight: '500',
  },
  timeWrapper: {
    paddingHorizontal: verticalScale(3),
    paddingVertical: verticalScale(2),
    borderRadius: 10,
    backgroundColor: colors.openGreen,
    width: '61%',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(7),
    paddingHorizontal: verticalScale(10),
  },
});