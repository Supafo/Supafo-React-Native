import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {LocationInputType} from './components.type';
import {ArrowBottomIcon, LocationIcon} from '../assets/images';
import {colors} from '../theme/colors';

export const LocationInput = (props: LocationInputType) => {
  return (
    <View style={styles.root}>
      <View style={styles.allInput}>
        <View style={styles.input}>
          <View style={styles.left}>
            <Image style={styles.icon} source={LocationIcon} />
            <View style={styles.content}>
              <Text style={styles.titleTop}>Seçilen konum</Text>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.titleBottom}>{props.distance}km içinde</Text>
            </View>
          </View>
          {/* <Image source={ArrowBottomIcon} style={styles.right} /> */}
        </View>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.splashtext,
    alignItems: 'center',
    textAlign: 'center',
  },
  allInput: {
    width: screenWidth,
    backgroundColor: colors.splashtext,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.strokeColor,
    borderBottomColor: colors.strokeColor,
    paddingHorizontal: 15,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 1,
  },
  icon: {
    width: 18,
    height: 21,
  },
  titleTop: {
    fontWeight: '400',
    fontSize: 9,
    color: colors.placeholder,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    color: '#333333',
  },
  titleBottom: {
    fontWeight: '700',
    fontSize: 9,
    color: colors.placeholder,
  },
  right: {
    justifyContent: 'flex-end',
    width: 21,
    height: 12,
  },
});
