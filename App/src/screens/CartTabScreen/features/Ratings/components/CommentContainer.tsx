import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {StarIcon} from '../../../../../assets/images';
import {colors} from '../../../../../theme/colors';

type Props = {
  img: any;
  name: string;
};

const CommentContainer = ({img, name}: Props) => {
  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Image source={img} style={styles.img} />
        <View style={styles.container}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={{fontSize: 13}}>1 gün önce</Text>
          </View>
          <View style={styles.row}>
            <Image source={StarIcon} style={styles.star} />
            <Image source={StarIcon} style={styles.star} />
            <Image source={StarIcon} style={styles.star} />
            <Image source={StarIcon} style={styles.star} />
            <Image source={StarIcon} style={styles.star} />
          </View>
          <Text style={styles.comment}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={[styles.name, {color: colors.greenColor}]}>
            Yemek Lokantası
          </Text>
          <Text style={{fontSize: 13}}>1 gün önce</Text>
        </View>
        <Text style={[styles.comment, {width: '100%'}]}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </Text>
      </View>
    </View>
  );
};

export default CommentContainer;

const styles = StyleSheet.create({
  main: {
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    margin: 10,
    marginStart: 15,
    width: 50,
    height: 50,
  },
  container: {
    marginTop: 10,
    marginStart: 10,
  },
  name: {
    paddingBottom: 5,
    fontSize: 15,
    color: '#000000',
    fontWeight: '600',
  },
  comment: {
    padding: 5,
    fontSize: 12,
    width: 250,
  },
  star: {
    marginEnd: 5,
    width: 10,
    height: 10,
  },
  wrapper: {
    marginTop: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 15,
    padding: 10,
  },
});
