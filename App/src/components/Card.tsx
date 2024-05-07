<<<<<<< HEAD
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {colors} from '../theme/colors';
import {CrossLineImage} from '../assets/images';
import {CardType} from './components.type';

export const Card: React.FC<CardType> = ({
  count,
  heartIcon,
  shareIcon,
  backgroundImage,
  title,
  restaurantLogo,
  time,
  starIcon,
  rate,
  distance,
  price,
  discountPrice,
  style,
  isNew = true,
  size = 'large',
  onPress,
  onHeartPress,
  onSharePress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles[size], style]}>
        <ImageBackground
          style={styles.backgroundImage}
          source={backgroundImage}
          imageStyle={count == 0 && styles.over}>
          <View style={[styles.all, styles.spaceBetweenColumn]}>
            <View style={[styles.top, styles.spaceBetweenRow]}>
              <View style={styles.spaceBetweenRow}>
                {count !== 0 && count && count <= 5 && (
                  <View style={[styles.topLeft, {backgroundColor: '#66AE7B'}]}>
                    <Text style={styles.topText}>Son {count}</Text>
                  </View>
                )}

                {isNew ? (
                  <View style={styles.newView}>
                    <Text
                      style={[
                        styles.newText,
                        {backgroundColor: colors.splashtext},
                      ]}>
                      Yeni
                    </Text>
                  </View>
                ) : null}

                {count == 0 || count == undefined || count == null ? (
                  <View style={[styles.overView, {backgroundColor: '#FF9200'}]}>
                    <Text style={styles.overText}>Tükendi</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.topRight}>
                <Pressable onPress={onHeartPress} style={styles.topIconView}>
                  <Image style={styles.topIcon} source={heartIcon} />
                </Pressable>
                {size !== 'medium' && (
                  <Pressable onPress={onSharePress} style={styles.topIconView}>
                    <Image style={styles.topIcon} source={shareIcon} />
                  </Pressable>
                )}
              </View>
            </View>
            <View style={[styles.bottom, styles.spaceBetweenRow]}>
              <View style={[styles.bottomLeft, styles.spaceBetweenColumn]}>
                <View style={styles.title}>
                  <Image style={styles.titleImage} source={restaurantLogo} />
                  <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.time}>
                  <Text style={styles.timeText}>Bugün:{time}</Text>
                </View>
                <View style={styles.info}>
                  <Image style={styles.infoRateIcon} source={starIcon} />
                  <Text style={styles.infoRateAndDistance}>
                    {' '}
                    {rate} | {distance} km
                  </Text>
                </View>
              </View>
              <View style={styles.bottomRight}>
                <View style={styles.crossedPriceView}>
                  <Text style={styles.crossedPrice}>{price}TL </Text>
                  <Image style={styles.crossLine} source={CrossLineImage} />
                </View>
                <Text style={styles.price}>{discountPrice}TL </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

const screenWidth = Dimensions.get('window').width;

<<<<<<< HEAD
const largeCardWidth = (screenWidth * 90) / 100;
const mediumCardWidth = (screenWidth * 70) / 100;
=======
const mediumCardWidth = (screenWidth * 80) / 90;
>>>>>>> DiscoverTabScreen

const styles = StyleSheet.create({
  spaceBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spaceBetweenColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  large: {
    width: screenWidth,
    height: 145,
  },
  medium: {
    width: mediumCardWidth,
    height: 155,
  },
  all: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
    overflow: 'hidden',
    borderRadius: 15,
  },
  over: {
    opacity: 0.7,
  },
  top: {
    alignItems: 'center',
  },
  topLeft: {
    width: 39,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  topText: {
    fontSize: 8,
    fontWeight: '600',
    color: colors.splashtext,
  },
  newView: {
    width: 39,
    height: 14,
    justifyContent: 'center',
  },
  newText: {
    fontSize: 8,
    fontWeight: '600',
    color: '#66AE7B',
    textAlign: 'center',
    borderRadius: 6,
  },
  overView: {
    width: 39,
    height: 14,
    borderRadius: 6,
    opacity: 1,
    justifyContent: 'center',
  },
  overText: {
    fontSize: 8,
    fontWeight: '600',
    color: colors.splashtext,
    textAlign: 'center',
  },
  topRight: {
    flexDirection: 'row',
    gap: 5,
  },
  topIconView: {
    backgroundColor: colors.splashtext,
    borderRadius: 999,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIcon: {
    width: 9,
    height: 9,
  },
  bottom: {
    width: '100%',
  },
  bottomLeft: {
    gap: 7,
  },
  title: {
    flexDirection: 'row',
    gap: 2.91,
    alignItems: 'center',
  },
  titleImage: {
    width: 21,
    height: 21,
  },
  titleText: {
    color: colors.splashtext,
    fontSize: 14,
    fontWeight: '600',
  },
  time: {
    height: 12,
    backgroundColor: '#66AE7B',
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  timeText: {
    fontWeight: '500',
    color: colors.splashtext,
    fontSize: 8,
  },
  info: {
    flexDirection: 'row',
    gap: 2,
  },
  infoRateIcon: {
    width: 7,
    height: 7,
  },
  infoRateAndDistance: {
    color: colors.splashtext,
    fontSize: 7,
    fontWeight: '500',
  },
  bottomRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.splashtext,
  },
  crossedPrice: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D0D5DD',
  },
  crossedPriceView: {
    position: 'relative',
  },
  crossLine: {
    width: '60%',
    position: 'absolute',
    top: '-10%',
    left: 0,
=======
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import DinnerPng from '../assets/images/kahvalti.png';
import FavoriteIcon from '../assets/images/FavoriteIcon.png';
import ShareIcon from '../assets/images/Share.png';
import StarIcon from '../assets/images/starIcon.png';
import {colors} from '../theme/colors';
import {ICardLarge} from '../components/components.type';
import loveBg from '../assets/images/loveBg.png';

export const Card: React.FC<ICardLarge> = ({
  count,
  distance,
  price,
  time,
  url,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: url}} style={styles.image} />
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
const screenWidth = Dimensions.get('window').width;
const largeCardWidth = (screenWidth * 85) / 100;
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    width: largeCardWidth,
    height: 135,
    marginTop: 15,
    borderRadius: 15,
    left: 10,
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
    width: 39,
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
    // borderWidth: 1,
    // borderColor: 'black',
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
>>>>>>> FavoriteScreen
  },
});
