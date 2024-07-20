import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Ayse, Berk, DefaultUser, StarIcon} from '../../../../assets/images';
import {colors} from '../../../../theme/colors';
import CommentContainer from './components/CommentContainer';
import Header from '../../../../components/Header';
import {RouteProp, useNavigation} from '@react-navigation/native';
import routes, {RootStackParamList} from '../../../../navigation/routes';
import firestore from '@react-native-firebase/firestore';

type RatingProp = RouteProp<RootStackParamList, 'RATINGS'>;

type Props = {
  route: RatingProp;
};

const RateAndComments = ({route}: Props) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const item = route.params.item;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await firestore()
          .collection('homeItems')
          .doc('homeList')
          .collection('items')
          .doc(item.id)
          .collection('reviews')
          .orderBy('createdAt', 'desc')
          .get();

        const reviewsData = reviewsSnapshot.docs.map(doc => doc.data());
        setReviews(reviewsData);

        const avgRating =
          reviewsData.reduce((acc, review) => acc + review.rating, 0) /
          reviewsData.length;
        setAverageRating(avgRating);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [item.id]);

  const getBarWidth = rating => {
    if (rating < Math.floor(averageRating)) {
      return '100%';
    } else if (rating === Math.floor(averageRating)) {
      return `${(averageRating % 1) * 100}%`;
    } else {
      return '0%';
    }
  };

  return (
    <View style={styles.main}>
      <Header title="Değerlendirmeler ve Yorumlar" />
      <View style={[styles.row, {margin: 20}]}>
        <View style={{margin: 10}}>
          <Text style={styles.title}>{averageRating.toFixed(1)}</Text>
          <View style={styles.row}>
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                source={StarIcon}
                style={styles.star}
                tintColor={i < averageRating ? colors.openOrange : '#E5E5E5'}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            width: 220,
            justifyContent: 'center',
            paddingStart: 35,
          }}>
          {[5, 4, 3, 2, 1].map(rating => (
            <View
              style={[styles.row, {alignItems: 'center', margin: 3}]}
              key={rating}>
              <Text
                style={{
                  fontSize: 16,
                  paddingEnd: 10,
                  top: 2,
                  color: '#000000',
                }}>
                {rating}
              </Text>
              <View
                style={{
                  width: 170,
                  backgroundColor: '#E5E5E5',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    width: getBarWidth(rating),
                    backgroundColor: colors.openOrange,
                    height: 8,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
      <ScrollView style={{height: '65%'}} showsVerticalScrollIndicator={false}>
        {reviews.map((review, index) => (
          <CommentContainer
            key={index}
            img={DefaultUser}
            name={review.userName || 'Anonim'}
            comment={review.comment}
            rating={review.rating}
          />
        ))}
      </ScrollView>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate(routes.HOME_TAB_NAVIGATOR, {screen: 'Anasayfa'})
          }>
          <Text style={styles.btnTxt}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RateAndComments;

const styles = StyleSheet.create({
  main: {backgroundColor: 'white'},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  star: {
    width: 13,
    height: 13,
    margin: 3,
  },
  btn: {
    padding: 10,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    backgroundColor: colors.greenColor,
    top: 10,
  },
  btnTxt: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
});
