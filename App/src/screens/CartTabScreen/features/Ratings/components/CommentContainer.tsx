import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {StarIcon} from '../../../../../assets/images';
import {colors} from '../../../../../theme/colors';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

type Props = {
  img: any;
  name: string;
  comment: string;
  rating: number;
};

const CommentContainer = ({img, name, comment, rating}: Props) => {
  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Image source={img} style={styles.img} />
        <View style={styles.container}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={{fontSize: moderateScale(13), color: '#333333'}}>1 gün önce</Text>
          </View>
          <View style={styles.row}>
            {[...Array(rating)].map((_, index) => (
              <Image key={index} source={StarIcon} style={styles.star} />
            ))}
          </View>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentContainer;

const styles = StyleSheet.create({
  main: {
    margin: moderateScale(10),
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    margin: moderateScale(10),
    marginStart: moderateScale(15),
    width: scale(50),
    height: scale(50),
  },
  container: {
    marginTop: verticalScale(10),
    marginStart: moderateScale(10),
  },
  name: {
    paddingBottom: verticalScale(5),
    fontSize: moderateScale(15),
    color: '#000000',
    fontWeight: '600',
  },
  comment: {
    padding: moderateScale(5),
    fontSize: moderateScale(12),
    width: scale(250),
    color: '#000000',
  },
  star: {
    marginEnd: moderateScale(5),
    width: scale(10),
    height: scale(10),
  },
});
