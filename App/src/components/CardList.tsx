import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ICardList} from './components.type';
import {colors} from '../theme/colors';
import {BurgerKingListImg} from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <Icon name={'heart'} color={'orange'} size={13} />
          </View>
        ) : (
          <View style={styles.favoriteIconContainer}>
            <Icon name={'heart-outline'} color={'orange'} size={13} />
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
            <Text style={styles.labelText}>{rate} | </Text>
            <Text style={styles.labelText}>{distance} km</Text>
          </View>
        </View>
        <View>
          <View style={styles.cardPrice}>
            <View style={styles.line}></View>
            <Text style={[styles.textPriceFirst]}>{price}TL</Text>
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
    backgroundColor: 'black',
    resizeMode: 'cover',
    height: 150,
    marginStart: 0,
    borderRadius: 15,
    width: 280,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 46,
    width: '100%',
    height: 62,
  },
  bottomLeft: {
    left: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    width: 157.5,
    height: 26,
  },
  cardPrice: {
    marginTop: 30,
    width: 65,
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 15,
    flexDirection: 'row',
  },
  headerTxt: {
    color: colors.splashtext,
    fontSize: 11,
    paddingHorizontal: 10,
    fontWeight: '600',
    borderRadius: 10,
    padding: 2,
  },
  newContainer: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginStart: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
    opacity: 0.6,
  },
  textPrice: {
    fontSize: 15,
    lineHeight: 15,
    color: colors.tabBarBg,
    fontWeight: '700',
    zIndex: 0,
    position: 'absolute',
    top: 17,
  },
  textPriceFirst: {
    height: 14,
    color: colors.tabBarBg,
    fontSize: 12,
    fontWeight: '700',
    zIndex: -1,
    position: 'absolute',
    left: 4,
  },
  line: {
    position: 'absolute',
    top: 7,
    left: 7,
    width: 41,
    height: 0,
    borderWidth: 0.7,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{rotate: '167.81deg'}],
    zIndex: 2,
  },
  logo: {
    width: 20.39,
    borderRadius: 20,
    height: 20,
    backgroundColor: colors.tabBarBg,
  },
  name: {
    fontWeight: '600',
    color: colors.cardText,
    marginLeft: 5,
  },
  favoriteIconContainer: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    marginEnd: 10,
  },
  ShareIcon: {
    width: 26,
    height: 26,
  },
  labelText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: colors.tabBarBg,
  },
  starandKm: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  star: {
    width: 12,
    height: 12,
    tintColor: colors.openGreen,
    marginEnd: 5,
  },
  timeTxt: {
    fontSize: 9,
    color: colors.tabBarBg,
  },
  timeWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: colors.openGreen,
    width: 95,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});
