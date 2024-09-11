import {PixelRatio, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../../theme/colors';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

type Props = {
  time: string;
  rate: number;
  price: number;
  discountPrice: number;
  item: any;
  address: any;
};

const RestaurantInfoContainer = ({
  time,
  rate,
  price,
  discountPrice,
  item,
  address,
}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={[styles.container]}>
        <View style={{marginEnd: moderateScale(10),marginStart: moderateScale(-7.5)}}>
          <View style={styles.row}>
            <SimpleLineIcons
              style={{
                paddingStart: moderateScale(10),
              }}
              name={'handbag'}
              size={scale(15)}
              color={'#66AE7B'}
            />
            <Text style={styles.txt}>Sürpriz Paket</Text>
          </View>
          <View style={styles.row}>
            <Icon
              style={{
                paddingStart: moderateScale(10),
              }}
              name={'clock-outline'}
              size={scale(15)}
              color={'#66AE7B'}
            />
            <Text style={styles.txtDay}>Bugün: {time}</Text>
          </View> 
          <View style={styles.row}>
            <Icon name={'star'} size={scale(15)} color={'green'} paddingStart={moderateScale(10)} />
            <Text style={styles.txtStar}>{rate} (574)</Text>
          </View>
        </View>
        <View style={styles.cardPrice}>
          <View style={styles.line}></View>
          <Text style={styles.textPriceFirst}>₺ {price}</Text>
          <Text style={styles.textPrice}>₺ {discountPrice}</Text>
        </View>
      </View>
      <Pressable style={styles.pressable}>
        <SimpleLineIcons name={'location-pin'} size={scale(17)} color={'#66AE7B'} />
        <View style={{flex: 1, paddingStart: moderateScale(3)}}>
          <Text style={styles.labelTitle} numberOfLines={1} ellipsizeMode='tail'>{address}</Text>
          <Text style={styles.labelTxt}>Mağaza hakkında daha fazla bilgi</Text>
        </View>
        <SimpleLineIcons name={'arrow-right'} size={scale(15)} color={'black'} />
      </Pressable>
    </View>
  );
};

export default RestaurantInfoContainer;

const styles = StyleSheet.create({
  main: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: moderateScale(7.5),
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(1.41),
    elevation: 2,
    height:verticalScale(67.5),
  },
  row: {
    marginTop:verticalScale(-4),
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(4.25),
  },
  txt: {
    color: '#333333',
    paddingStart: moderateScale(5),
    fontSize: moderateScale(13.5),
  },
  txtDay: {
    color: '#333333',
    paddingStart: moderateScale(5),
    fontSize: moderateScale(11)
  },
  txtStar: {
    color: '#333333',
    paddingStart: moderateScale(5),
    fontSize: moderateScale(11.5)
  },
  labelTxt: {
    color: 'gray',
    fontSize: moderateScale(10),
    fontWeight:'400',
  },
  labelTitle: {
    width: scale(210),
    fontSize: moderateScale(14),
    color: '#333333',
    fontWeight: '600',
  },
  cardPrice: {
    paddingRight:moderateScale(17.5),
    paddingBottom: moderateScale(15),
    justifyContent: 'center',
  },
  textPrice: {
    fontSize: moderateScale(18),
    color: '#333333',
    fontWeight: '600',
    bottom: moderateScale(2.5),
  },
  textPriceFirst: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    textAlign: 'right',
    color: '#888C91',
  },
  line: {
    position: 'absolute',
    top: moderateScale(13.5),
    left: moderateScale(23),
    width: scale(27.5),
    borderRadius: moderateScale(20),
    borderWidth: scale(1),
    backgroundColor:'#4CAF50',
    opacity: 0.8,
    borderColor: '#4CAF50',
    transform: [{ rotate: '166.81deg' }],
    zIndex: 2,
  },
  pressable: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: verticalScale(18),
    paddingEnd: moderateScale(25),
    paddingStart: moderateScale(15),
    alignItems: 'center',
    marginBottom: verticalScale(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(1.41),
    elevation: 2,
    height: verticalScale(52.5),
  },
});