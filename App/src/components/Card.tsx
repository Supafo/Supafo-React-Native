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

const largeCardWidth = (screenWidth * 90) / 100;
const mediumCardWidth = (screenWidth * 70) / 100;

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
  },
});
