import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import DinnerPng from '../assets/images/kahvalti.png';
import StarIcon from '../assets/images/starIcon.png';
import {colors} from '../theme/colors';
import {ICardLarge} from '../components/components.type';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

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
            <AntDesign name="hearto" size={12} color={colors.openOrange} />
          </View>
          <View style={styles.favoriteIcon}>
            <Feather name="share-2" size={12} color={colors.greenColor} />
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
              {4.9}| {distance} km
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.cardPrice}>
            <View style={styles.line}></View>
            <Text style={[styles.textPriceFirst]}>110.90 TL</Text>
            <Text style={styles.textPrice}>{discountPrice} TL</Text>
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
    height: 148,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  bottomLeft: {
    left: 15,
  },
  cardBottomDinner: {
    flexDirection: 'row',
    width: 157.5,
    height: 26,
  },
  cardPrice: {
    marginTop: 25,
    width: 65,
    height: 28,
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.openGreen,
  },
  text: {
    color: colors.splashtext,
    fontSize: 12,
    paddingHorizontal: 10,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
    opacity: 0.6,
  },
  textPrice: {
    fontSize: 16,
    color: colors.tabBarBg,
    fontWeight: '700',
    zIndex: 0,
    position: 'absolute',
    top: 17,
    right: 10,
    width: 70,
  },
  textPriceFirst: {
    width: 70,
    color: '#D0D5DD',
    fontSize: 12,
    fontWeight: '700',
    zIndex: -1,
    position: 'absolute',
    right: 0,
  },
  line: {
    position: 'absolute',
    top: 5,
    left: 0,
    width: 41,
    height: 0,
    borderWidth: 1,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{rotate: '167.81deg'}],
    zIndex: 2,
  },
  dinnerPng: {
    width: 20.39,
    borderRadius: 20,
    height: 20,
    backgroundColor: colors.tabBarBg,
  },
  dinnertext: {
    fontWeight: '600',
    color: colors.cardText,
    marginLeft: 5,
    fontSize: 16,
  },
  favoriteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    margin: 4,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 100,
  },
  loveBg: {
    width: 32,
    height: 32,
  },
  ShareIcon: {
    width: 32,
    height: 32,
  },
  kmText: {
    width: 60,
    height: 17,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: colors.tabBarBg,
  },
  starandKm: {
    flexDirection: 'row',
    width: 34,
    height: 8,
    left: 20,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    width: 12,
    height: 12,
    tintColor: colors.openGreen,
  },
  time: {
    fontSize: 10,
    color: colors.tabBarBg,
  },
  timebg: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: colors.openGreen,
    width: '68%',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginStart: 15,
    marginEnd: 7,
    marginTop: 4,
  },
});
