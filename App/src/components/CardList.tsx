import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../theme/colors';
import {BurgerKingListImg} from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';

type CardListType = {
  item: any;
};

const CardList = ({item: initialItem}: CardListType) => {
  const [pressed, setPressed] = useState(initialItem.isFavorite);
  const [docId, setDocId] = useState<string | null>(null);
  const [favItem, setFavItem] = useState(initialItem);

  const userId = useSelector((state: RootState) => state.setUserId.id);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favoritesSnapshot = await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .where('id', '==', favItem.id)
          .get();

        if (!favoritesSnapshot.empty) {
          const doc = favoritesSnapshot.docs[0];
          setDocId(doc.id);
          setPressed(true);
        }
      } catch (error) {
        console.error('Error checking if item is favorite: ', error);
      }
    };

    checkIfFavorite();
  }, [favItem.id, userId]);

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
          .doc(favItem.id)
          .update({isFavorite: true});

        setDocId(newDocRef.id);
        setPressed(true);
        setFavItem(prevItem => ({...prevItem, isFavorite: true}));
        console.log('Item added to favorites successfully', newDocRef.id);
      } else if (docId) {
        await firestore()
          .collection('homeItems')
          .doc('homeList')
          .collection('items')
          .doc(favItem.id)
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
        setFavItem(prevItem => ({...prevItem, isFavorite: false}));
        console.log('Item removed from favorites successfully');
      }
    } catch (error) {
      console.error('Error managing item in favorites: ', error);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={BurgerKingListImg} style={styles.image} />
      <View style={styles.cardTop}>
        <View style={styles.lastNumber}>
          {favItem.lastProduct !== 'Tükendi' ? (
            <Text
              style={[styles.headerTxt, {backgroundColor: colors.greenColor}]}>
              Son {favItem.lastProduct}
            </Text>
          ) : (
            <Text
              style={[styles.headerTxt, {backgroundColor: colors.openOrange}]}>
              Tükendi
            </Text>
          )}
          {favItem.isNew ? (
            <View style={styles.newContainer}>
              <Text style={[styles.headerTxt, {color: colors.greenColor}]}>
                Yeni
              </Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={() => addFavItemToFirebase(favItem)}
          style={styles.favoriteIconContainer}>
          <Icon
            name={pressed ? 'heart' : 'heart-outline'}
            color={'orange'}
            size={moderateScale(13)}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.label}>
        <View style={styles.bottomLeft}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/burger-king-logo.png')}
            />
            <Text style={styles.name}>{favItem.name}</Text>
          </View>

          <View style={styles.timebg}>
            <Text style={styles.time}>Bugün: {favItem.time}</Text>
          </View>

          <View style={styles.starandKm}>
            <Image
              style={styles.star}
              source={require('../assets/images/star.png')}
            />
            <View style={{marginLeft: scale(4), flexDirection: 'row'}}>
              <Text style={styles.labelText}>{favItem.rate} | </Text>
              <Text style={styles.labelText}>{favItem.distance} km</Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <View style={styles.cardPrice}>
            <Text style={styles.textPrice}>{favItem.discountPrice} TL</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  card: {
    marginVertical: verticalScale(2),
    backgroundColor: 'black',
    resizeMode: 'cover',
    height: moderateScale(148),
    borderRadius: 15,
    width: moderateScale(250),
    justifyContent: 'space-between',
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
    paddingHorizontal: verticalScale(10),
  },
  bottomLeft: {
    width: scale(110),
  },
  logoContainer: {
    flexDirection: 'row',
    width: moderateScale(157.5),
    marginBottom: verticalScale(2.5),
    alignItems: 'center',
  },
  cardPrice: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  headerTxt: {
    color: colors.splashtext,
    fontSize: moderateScale(10),
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(1),
    fontWeight: '600',
    borderRadius: 10,
  },
  newContainer: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: scale(5),
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
    opacity: 0.6,
  },
  textPrice: {
    fontSize: moderateScale(12),
    color: colors.tabBarBg,
    fontWeight: '700',
  },
  textPriceFirst: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: colors.tabBarBg,
  },
  line: {
    position: 'absolute',
    width: moderateScale(41),
    borderWidth: 0.7,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{rotate: '170.81deg'}],
    zIndex: 2,
    borderRadius: 15,
  },
  logo: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: 20,
    backgroundColor: colors.tabBarBg,
  },
  name: {
    fontWeight: '600',
    color: colors.cardText,
    marginLeft: scale(5),
    fontSize: moderateScale(12),
  },
  favoriteIconContainer: {
    alignItems: 'center',
    padding: scale(4),
    backgroundColor: 'white',
    borderRadius: 100,
  },
  ShareIcon: {
    width: 26,
    height: 26,
  },
  labelText: {
    textAlign: 'center',
    fontSize: moderateScale(10),
    fontWeight: '400',

    color: colors.tabBarBg,
  },
  starandKm: {
    flexDirection: 'row',
    paddingTop: verticalScale(5),
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  },
  timebg: {
    backgroundColor: colors.openGreen,
    borderRadius: 10,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(4),
    alignSelf: 'flex-start',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(7),
    paddingHorizontal: verticalScale(10),
  },
});
