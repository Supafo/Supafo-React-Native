import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import DinnerPng from '../assets/images/kahvalti.png';
import StarIcon from '../assets/images/starIcon.png';
import {colors} from '../theme/colors';
import {ICardLarge} from '../components/components.type';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const screenWidth = Dimensions.get('window').width;
const largeCardWidth = (screenWidth * 95) / 100;

export const Card: React.FC<ICardLarge & {initialItem: any}> = ({
  count,
  distance,
  price,
  time,
  url,
  favoriteScreen,
  discountPrice,
  initialItem,
}) => {
  const [pressed, setPressed] = useState(initialItem?.isFavorite ?? false);
  const [docId, setDocId] = useState<string | null>(null);
  const [item, setItem] = useState(initialItem);
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.setUserId.id);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favoritesSnapshot = await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .where('id', '==', item?.id)
          .get();

        if (!favoritesSnapshot.empty) {
          const doc = favoritesSnapshot.docs[0];
          setDocId(doc?.id);
          setPressed(true);
        }
      } catch (error) {
        console.error('Error checking if item is favorite: ', error);
      }
    };

    checkIfFavorite();
  }, [item?.id, userId]);

  const addFavItemToFirebase = async (favs: object) => {
    try {
      if (!pressed) {
        const newDocRef = await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .add({...favs, isFavorite: true});

        await firestore()
          .collection('homeItems')
          .doc('homeList')
          .collection('items')
          .doc(item.id)
          .update({isFavorite: true});

        setDocId(newDocRef.id);
        setPressed(true);
        setItem((prevItem: any) => ({...prevItem, isFavorite: true}));
        console.log('Item added to favorites successfully', newDocRef.id);
      } else if (docId) {
        await firestore()
          .collection('homeItems')
          .doc('homeList')
          .collection('items')
          .doc(item.id)
          .update({isFavorite: false});

        await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .doc(docId)
          .update({isFavorite: false});

        await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .doc(docId)
          .delete();

        setDocId(null);
        setPressed(false);
        setItem((prevItem: any) => ({...prevItem, isFavorite: false}));
        console.log('Item removed from favorites successfully');
      }
    } catch (error) {
      console.error('Error managing item in favorites: ', error);
    }
  };

  return (
    <View
      style={[
        styles.card,
        favoriteScreen ? {width: '95%'} : {width: largeCardWidth},
      ]}>
      <Image
        source={require('../assets/images/CardBg.jpg')}
        style={styles.image}
      />
      <View style={styles.cardTop}>
        <View style={styles.lastNumber}>
          <Text style={styles.text}>Son {count}</Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            console.log('pressedd');
            addFavItemToFirebase(item);
          }}
          style={styles.favoriteIconContainer}>
          <View style={styles.favoriteIcon}>
            <AntDesign
              name="hearto"
              size={moderateScale(12)}
              color={colors.openOrange}
            />
          </View>
        </TouchableWithoutFeedback>
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
            <Text style={styles.kmText}>
              {4.9} | {distance} km
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <View style={styles.cardPrice}>
            <Text style={styles.current}>₺</Text>
            <Text style={styles.textPrice}> {discountPrice}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    height: moderateScale(148),
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
    paddingHorizontal: verticalScale(10),
  },
  bottomLeft: {
    width: scale(130),
  },
  cardBottomDinner: {
    flexDirection: 'row',
    width: moderateScale(157.5),
    alignItems: 'center',
    marginBottom: verticalScale(6.5),
  },
  cardPrice: {
    position: 'relative',
    width: moderateScale(75),
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.openGreen,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
  },
  text: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: moderateScale(11),
    fontWeight: '600',
    alignSelf: 'center',
    lineHeight: moderateScale(14),
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
    opacity: 0.6,
  },
  textPrice: {
    fontSize: moderateScale(15),
    color: colors.tabBarBg,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  current: {
    fontSize: moderateScale(14),
    color: colors.tabBarBg,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  textPriceFirst: {
    color: '#D0D5DD',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  line: {
    position: 'absolute',
    width: moderateScale(50),
    borderWidth: 1,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{rotate: '170.81deg'}],
    zIndex: 2,
    borderRadius: 15,
  },
  dinnerPng: {
    width: moderateScale(23),
    borderRadius: 20,
    height: moderateScale(23),
    backgroundColor: colors.tabBarBg,
  },
  dinnertext: {
    fontWeight: '600',
    color: colors.cardText,
    marginLeft: scale(5),
    fontSize: moderateScale(16),
    textAlign: 'center',
    textShadowColor: '#333333',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1.5,
      height: 0.5,
    },
  },
  favoriteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  favoriteIcon: {
    backgroundColor: 'white',
    padding: scale(4),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  kmText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.tabBarBg,
    marginLeft: scale(4),
  },
  starandKm: {
    flexDirection: 'row',
    paddingTop: verticalScale(4),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  star: {
    width: scale(10),
    height: scale(10),
    tintColor: colors.openGreen,
  },
  time: {
    fontSize: moderateScale(11),
    color: colors.tabBarBg,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScale(14),
  },
  timebg: {
    backgroundColor: colors.openGreen,
    borderRadius: 10,
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(8),
    alignSelf: 'flex-start',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: verticalScale(8),
    marginTop: verticalScale(8),
  },
});
