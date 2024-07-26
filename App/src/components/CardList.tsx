import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../theme/colors';
import {BurgerKingListImg, StarIcon} from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';

type CardListType = {
  item: any;
};

const logoImages = {
  'Burger King': require('../assets/images/burger-king-logo.png'),
  "Mc Donald's": require('../assets/images/mc-dolands-logo.png'),
  'Little Caesars': require('../assets/images/littleceaser-logo.png'),
  "Arby's": require('../assets/images/arbys-logo.png'),
  Popoyes: require('../assets/images/popoyes-logo.jpg'),
  'Maydonoz Döner': require('../assets/images/maydonoz-logo.png'),
  'Kardeşler Fırın': require('../assets/images/kardesler-fırın-logo.jpg'),
  'Simit Sarayı': require('../assets/images/simir-sarayı-logo.png'),
  'Simit Center': require('../assets/images/simit-center-logo.jpg'),
};

const CardList = ({item: initialItem}: CardListType) => {
  const [pressed, setPressed] = useState(initialItem.isFavorite);
  const [docId, setDocId] = useState<string | null>(null);
  const [favItem, setFavItem] = useState(initialItem);
  const [logoSource, setLogoSource] = useState<any>(
    require('../assets/images/burger-king-img.png'),
  );

  const userId = useSelector((state: RootState) => state.setUserId.id);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favoritesRef = firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items');

        const favoritesSnapshot = await favoritesRef.get();
        let found = false;

        favoritesSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.id === favItem.id) {
            setDocId(doc.id);
            setPressed(true);
            found = true;
          }
        });

        if (!found) {
          setDocId(null);
          setPressed(false);
        }
      } catch (error) {
        console.error('Error checking if item is favorite: ', error);
      }
    };

    if (favItem.id) {
      checkIfFavorite();
    }
  }, [favItem.id, userId]);

  useEffect(() => {
    const logo =
      logoImages[favItem.name] ||
      require('../assets/images/burger-king-img.png');
    setLogoSource(logo);
  }, [favItem.name]);

  const addFavItemToFirebase = async (favs: object) => {
    try {
      if (!pressed) {
        // Add to favorites
        const newDocRef = await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .add({...favs, isFavorite: true});

        // Update homeItems
        await firestore()
          .collection('homeItems')
          .doc('homeList')
          .collection('items')
          .doc(favItem.id)
          .update({isFavorite: true});

        await firestore()
          .collection('breakfastItems')
          .doc('breakfastList')
          .collection('items')
          .doc(favItem.id)
          .update({isFavorite: true});

        await firestore()
          .collection('newSurprisepackage')
          .doc('packageList')
          .collection('items')
          .doc(favItem.id)
          .update({isFavorite: true});

        setDocId(newDocRef.id);
        setPressed(true);
        setFavItem(prevItem => ({...prevItem, isFavorite: true}));
        console.log('Item added to favorites successfully', newDocRef.id);
      } else if (docId) {
        // Remove from favorites
        await firestore()
          .collection('homeItems')
          .doc('homeList')
          .collection('items')
          .doc(favItem.id)
          .update({isFavorite: false});

        await firestore()
          .collection('breakfastItems')
          .doc('breakfastList')
          .collection('items')
          .doc(favItem.id)
          .update({isFavorite: false});

        await firestore()
          .collection('newSurprisepackage')
          .doc('packageList')
          .collection('items')
          .doc(favItem.id)
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
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            favItem.lastProduct === 'Tükendi'
              ? 'rgba(255,255,255, 0.4)'
              : 'black',
        },
      ]}>
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
            size={moderateScale(15)}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.label}>
        <View style={styles.bottomLeft}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logoSource} />
            <Text style={styles.name}>{favItem.name}</Text>
          </View>

          <View style={styles.timebg}>
            <Text style={styles.time}>Bugün: {favItem.time}</Text>
          </View>

          <View style={styles.starandKm}>
            <Image style={styles.star} source={StarIcon} />
            <Text style={styles.labelText}>
              {favItem.rate} | {favItem.distance} km
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <View style={styles.cardPrice}>
            <Text style={styles.textPrice}>₺{favItem.discountPrice}</Text>
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
    height: moderateScale(150),
    borderRadius: 15,
    width: moderateScale(270),
    justifyContent: 'space-between',
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
    paddingHorizontal: verticalScale(10),
  },
  bottomLeft: {
    width: scale(130),
  },
  logoContainer: {
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
  current: {
    fontSize: moderateScale(18),
    color: colors.tabBarBg,
    fontWeight: '400',
    fontFamily: 'Inter',
    letterSpacing: 5,
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
  },
  headerTxt: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: moderateScale(11),
    fontWeight: '600',
    alignSelf: 'center',
    lineHeight: moderateScale(14),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    borderRadius: 25,
  },
  newContainer: {
    alignItems: 'center',
    borderRadius: 25,
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
    fontSize: moderateScale(18),
    color: colors.tabBarBg,
    fontWeight: '700',
    fontFamily: 'Inter',
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
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: 20,
    backgroundColor: colors.tabBarBg,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: '600',
    color: colors.cardText,
    marginLeft: scale(5),
    fontSize: moderateScale(17),
    textAlign: 'center',
    textShadowColor: '#333333',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1.5,
      height: 0.5,
    },
  },
  favoriteIconContainer: {
    alignItems: 'center',
    padding: scale(3),
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    zIndex: 999,
  },
  ShareIcon: {
    width: scale(20),
    height: scale(20),
  },
  time: {
    fontSize: moderateScale(10),
    color: colors.tabBarBg,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScale(14),
  },
  timebg: {
    backgroundColor: colors.openGreen,
    borderRadius: 10,
    paddingVertical: verticalScale(1.5),
    paddingHorizontal: scale(8),
    alignSelf: 'flex-start',
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
  labelText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.tabBarBg,
    marginLeft: scale(4),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: verticalScale(8),
    marginTop: verticalScale(8),
  },
});
