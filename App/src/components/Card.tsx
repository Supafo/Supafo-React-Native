import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {
  BreakfastImage,
  FavoriteIcon,
  StarIcon,
  ShareIcon,
  RestaurantLogo,
} from '../assets/images';

export const Card = () => {
  return (
    <View style={styles.card}>
      <Image source={BreakfastImage} style={styles.image} />
      <View style={styles.lastNumber}>
        <Text style={styles.text}>Son 5</Text>
      </View>

      <View style={styles.favoriteIconContainer}>
        <Image source={FavoriteIcon} style={styles.favoriteIcon} />
        <Image source={ShareIcon} style={styles.ShareIcon} />
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.cardBottomDinner}>
          <Image style={styles.dinnerPng} source={RestaurantLogo} />
          <Text style={styles.dinnertext}>Kahvaltılık</Text>
        </View>

        <View style={styles.timebg}>
          <Text style={styles.time}>Bugün: 06:00-07:00</Text>
        </View>

        <View style={styles.starandKm}>
          <Image style={styles.star} source={StarIcon} />
          <Text style={styles.kmText}>4.9 | 1 km</Text>
        </View>

        <View style={styles.cardPrice}>
          <View style={styles.line}></View>
          <Text style={[styles.textPriceFirst]}>110.90 TL</Text>
          <Text style={styles.textPrice}>89.90 TL</Text>
        </View>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const largeCardWidth = (screenWidth * 90) / 100;
const largeCardBottomWidth = (screenWidth * 95) / 100;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 135,
    marginTop: 25,
    borderRadius: 15,
  },
  cardBottom: {
    marginTop: 30,
    width: '100%',
    height: 62,
    left: 8.74,
  },
  cardBottomDinner: {
    flexDirection: 'row',
    width: 157.5,
    height: 26,
  },
  cardPrice: {
    width: 65,
    height: 28,
    left: 269,
    bottom: 35,
  },
  lastNumber: {
    width: 60,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.greenColor,
    marginLeft: 15,
    marginTop: 10,
  },
  text: {
    color: colors.splashtext,
    fontSize: 15,
    paddingHorizontal: 10,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
    opacity: 0.9,
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
    borderColor: colors.greenColor,
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
    color: '#F5F5FA',
    marginLeft: 13,
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderColor: colors.tabBarBg,
    borderRadius: 50,
    flexDirection: 'row',
    marginLeft: 10,
  },
  favoriteIcon: {
    width: 16,
    height: 16,
    tintColor: '#FF9200',
    backgroundColor: colors.tabBarBg,
    marginRight: 8,
  },
  ShareIcon: {
    width: 16,
    height: 16,
    backgroundColor: colors.tabBarBg,
    marginLeft: 8,
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
    width: 65,
    marginTop: 10,
    lineHeight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    width: 12,
    height: 12,
    tintColor: colors.greenColor,
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
    backgroundColor: colors.greenColor,
    width: 95,
  },
});
