import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme/colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

type Props = {
  item: any;
};

const DetailHeader = ({item}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <View style={styles.headerButtons}>
        <View>
          <TouchableOpacity
            style={[styles.button, {flex: 1}]}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/arrow-back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require('../../../assets/images/shareIcon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CartTabScreen')}>
            <Image
              source={require('../../../assets/images/cart-tab-icon.png.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={require('../../../assets/images/restaurant-img.png')}
        style={styles.img}
      />
      <View style={styles.label}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/burger-king-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.labelTxt}>{item.title}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Icon name="heart" size={scale(15)} color={colors.openOrange} margin={scale(3)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    width: '100%',
    height: 230,
    backgroundColor: 'white',
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: scale(8),
  },
  button: {
    backgroundColor: 'white',
    padding: scale(2),
    borderRadius: 100,
    margin: scale(8),
  },
  icon: {
    width: scale(15),
    height: scale(15),
    tintColor: 'black',
    margin: scale(4)
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 0,
  },
  label: {
    position: 'absolute',
    bottom: 3,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  logo: {
    marginStart: 10,
  },
  labelTxt: {
    fontSize: 18,
    color: 'white',
    padding: 10,
  },
});
