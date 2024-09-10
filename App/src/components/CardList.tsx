import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../theme/colors';
import {StarIcon} from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import responsiveScale from '../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

type CardListType = {
  item: any;
};

const logoImages = {
  'Burger King': require('../assets/images/burger-king-logo.png'),
  "Mc Donald's": require('../assets/images/mc-dolands-logo.png'),
  'Little Caesars': require('../assets/images/littleceaser-logo.png'),
  "Arby's": require('../assets/images/arbys-logo.png'),
  "Popoyes": require('../assets/images/popoyes-logo.jpg'),
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

    checkIfFavorite();
  }, [favItem.id, userId]);

  useEffect(() => {
    const logo =
      logoImages[favItem.name] ||
      require('../assets/images/burger-king-img.png');
    setLogoSource(logo);
  }, [favItem.name]);

  const addFavItemToFirebase = async (favItem: object) => {
    try {
      const collectionsToUpdate = [
        { collection: 'homeItems', doc: 'homeList' },
        { collection: 'breakfastItems', doc: 'breakfastList' },
        { collection: 'newSurprisepackage', doc: 'packageList' },
      ];

      for (const { collection, doc } of collectionsToUpdate) {
        const itemSnapshot = await firestore()
          .collection(collection)
          .doc(doc)
          .collection('items')
          .doc(favItem.id)
          .get();

        if (itemSnapshot.exists) {
          if (!pressed) {
            await itemSnapshot.ref.update({ isFavorite: true });
            console.log(`Item updated to favorite in ${collection}`);
          } else {
            await itemSnapshot.ref.update({ isFavorite: false });
            console.log(`Item removed from favorites in ${collection}`);
          }
        }
      }

      if (!pressed) {
        await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .doc(favItem.id)
          .set({ ...favItem, isFavorite: true });

        setDocId(favItem.id);
        setPressed(true);
        setFavItem((prevItem) => ({ ...prevItem, isFavorite: true }));
        console.log('Item added to favorites successfully', favItem.id);
      } else if (docId) {
        await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .doc(docId)
          .delete();

        setDocId(null);
        setPressed(false);
        setFavItem((prevItem) => ({ ...prevItem, isFavorite: false }));
        console.log('Item removed from favorites successfully');
      }
    } catch (error) {
      console.error('Error managing item in favorites: ', error);
    }
  };

  return (
    <View style={[styles.card,{opacity: favItem.lastProduct === 'Tükendi' ? 0.5 : 1, backgroundColor:'#FFFFFF'}]}>
      <Image source={{uri: favItem.photoUrl}} style={styles.image} />
      <LinearGradient 
         start={{x: 0, y: favItem.lastProduct === 'Tükendi' ? 0 : 1}} 
         end={{x: 0, y: 0}} 
         colors={favItem.lastProduct === 'Tükendi' 
           ? ['transparent', 'transparent'] 
           : ['#000000', 'transparent']} 
         style={styles.gradient}
      />
      <View style={styles.cardTop}>
        <View style={styles.lastNumber}>
        <View style={styles.lastNumber}>
          {favItem.lastProduct !== 'Tükendi' ? (
           Number(favItem.lastProduct) <= 5 ?
           <Text
           style={[styles.headerTxt, {backgroundColor: colors.greenColor}]}>
           Son {favItem.lastProduct}
         </Text>
         :
         null
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
        </View>

        <TouchableOpacity
          onPress={() => addFavItemToFirebase(favItem)}
          style={styles.favoriteIconContainer}>
          <View style={styles.favoriteIcon}>
            <AntDesign
              name={favItem.isFavorite ? "heart" : "hearto"}
              size={moderateScale(12)}
              color={colors.openOrange}
            />
          </View>
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
        <View style={styles.cardPrice}>
          <Text style={styles.textPrice}>₺{favItem.discountPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  card: {
    marginVertical: verticalScale(2),
    height: verticalScale(117),
    borderRadius: moderateScale(15),
    width: scale(210),
    backgroundColor: 'black',
    position: 'relative',
    overflow: 'hidden',  
    justifyContent:'space-between'
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',  
    borderRadius: moderateScale(15),
    zIndex: 1, 
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(15),
    position: 'absolute',
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,  
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    marginTop: moderateScale(5),
    zIndex: 2,
  },
  headerTxt: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: moderateScale(9),
    fontWeight: '600',
    alignSelf: 'center',
    width:moderateScale(55),
    lineHeight: verticalScale(11),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(3),
    borderRadius: moderateScale(25),
  },
  newContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(25),
    backgroundColor: 'white',
    marginLeft: moderateScale(3),
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    marginStart: moderateScale(1.5),
  },
  text: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: moderateScale(11),
    fontWeight: '600',
    lineHeight: verticalScale(14),
  },
  favoriteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  favoriteIcon: {
    backgroundColor: 'white',
    padding: moderateScale(4.8),
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
    paddingHorizontal: moderateScale(10),
    zIndex: 111
  },
  bottomLeft: {
    width: moderateScale(130),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6.5),
  },
  cardPrice: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    top: moderateScale(2.5),
  },
  textPrice: {
    fontSize: moderateScale(17),
    color: colors.tabBarBg,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  logo: {
    width: scale(19.5),
    height: verticalScale(19.5),
    borderRadius: 20,
    backgroundColor: colors.tabBarBg,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: '600',
    color: colors.cardText,
    marginLeft: moderateScale(5),
    fontSize: moderateScale(15),
    textAlign: 'center',
    textShadowColor: '#333333',
    textShadowRadius: 1,
    textShadowOffset: {
      width: moderateScale(1.5),
      height: verticalScale(0.5),
    },
  },
  timebg: {
    backgroundColor: colors.openGreen,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    alignSelf: 'flex-start',
    marginTop: moderateScale(-2.75)
  },
  time: {
    fontSize: moderateScale(8),
    color: colors.tabBarBg,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: verticalScale(12),
  },
  starandKm: {
    flexDirection: 'row',
    paddingTop: verticalScale(4),
    alignItems: 'center',
  },
  star: {
    width: scale(9),
    height: verticalScale(8),
    tintColor: colors.openGreen,
  },
  labelText: {
    fontSize: moderateScale(10),
    fontWeight: '400',
    color: colors.tabBarBg,
    marginLeft: moderateScale(4),
  },
});
