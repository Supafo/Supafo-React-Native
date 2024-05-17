import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import DinnerPng from '../assets/images/kahvalti.png';
import FavoriteIcon from '../assets/images/FavoriteIcon.png';
import ShareIcon from '../assets/images/Share.png';
import StarIcon from '../assets/images/starIcon.png';
import {colors} from '../theme/colors';
import {ICardLarge} from '../components/components.type';
import loveBg from '../assets/images/loveBg.png';


const screenWidth = Dimensions.get('window').width;
const largeCardWidth = (screenWidth * 85) / 100;


export const Card: React.FC<ICardLarge> = ({
  count,
  distance,
  price,
  time,
  url,
  favoriteScreen
}) => {
  return (
    <View style={[styles.card, favoriteScreen ? {width: '95%' } : {width: largeCardWidth} ]}>
      <Image
        source={require('../assets/images/CardBg.png')}
        style={styles.image}
      />
      <View style={styles.cardTop}>
        <View style={styles.lastNumber}>
          <Text style={styles.text}>Son {count}</Text>
        </View>

        <View style={styles.favoriteIconContainer}>
          <Image source={loveBg} style={styles.loveBg} />
          <Image source={FavoriteIcon} style={styles.favoriteIcon} />
          <Image source={ShareIcon} style={styles.ShareIcon} />
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
            <Text style={styles.kmText}>{distance} km</Text>
          </View>
        </View>
        <View>
          <View style={styles.cardPrice}>
            <View style={styles.line}></View>
            <Text style={[styles.textPriceFirst]}>110.90 TL</Text>
            <Text style={styles.textPrice}>{price} TL</Text>
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
    height: 135,
    margin: 10,
    borderRadius: 15,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 46,
    width: '100%',
    height: 62,
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
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.openGreen,
    marginLeft: 15,
    marginTop: 10,
  },
  text: {
    color: colors.splashtext,
    fontSize: 8,
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
    fontSize: 12,
    lineHeight: 15,
    color: colors.tabBarBg,
    fontWeight: '700',
    zIndex: 0,
    position: 'absolute',
    top: 17,
  },
  textPriceFirst: {
    width: 100,
    height: 12,
    color: colors.tabBarBg,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
    zIndex: -1,
    position: 'absolute',
  },
  line: {
    position: 'absolute',
    top: 3,
    left: 12,
    width: 41,
    height: 0,
    borderWidth: 2,
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
    marginLeft: 13,
  },
  favoriteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 25,
    top: 10,
    // marginLeft: 10,
    // left: 295,
    // bottom: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    right: 30,
    width: 10,
    height: 10,
    left: 3,
    tintColor: colors.openOrange,
  },
  loveBg: {
    width: 26,
    height: 26,
  },
  ShareIcon: {
    width: 26,
    height: 26,
  },

  kmText: {
    width: 50,
    height: 15,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: colors.tabBarBg,
  },
  starandKm: {
    flexDirection: 'row',
    width: 34,
    height: 8,
    left: 18,
    marginTop: 10,
    lineHeight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    width: 12,
    height: 12,
    tintColor: colors.openGreen,
  },
  time: {
    fontSize: 8,
    color: colors.tabBarBg,
    width: 90,
  },
  timebg: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: colors.openGreen,
    width: 95,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
