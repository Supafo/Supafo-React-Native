import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IAdressInfoComp} from './components.type';
import { scale, verticalScale } from 'react-native-size-matters';

export const AdressInfoComp: React.FC<IAdressInfoComp> = ({
  leftIcon,
  name,
  title,
}) => {
  return (
    <View style={styles.root}>
      {leftIcon}
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export const addressInfoMocks = [
  {
    text: 'Ev',
    title: 'Kadıköy, Sürpriz Sokak No:12 ',
  },
  {
    text: 'İş',
    title: 'Ümraniye, Sürpriz Sokak No:12',
  },
];
const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    height:verticalScale(61),
    paddingLeft: 21,
  },
  text: {
    fontSize: scale(16),
    color: 'black',
    lineHeight: 17,
    fontWeight: '400',
  },
  title: {fontSize: 14, color: 'black'},
});
