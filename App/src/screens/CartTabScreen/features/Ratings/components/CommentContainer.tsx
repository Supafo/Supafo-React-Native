import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {StarIcon} from '../../../../../assets/images';
import {colors} from '../../../../../theme/colors';

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
            <Text style={{fontSize: 13, color: '#333333'}}>1 gün önce</Text>
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
    color: '#000000',
  },
  star: {
    marginEnd: 5,
    width: 10,
    height: 10,
  },
});
