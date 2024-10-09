import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../theme/colors';
import {StarIcon} from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    <View style={[styles.card,{opacity: favItem.lastProduct === 'Tükendi' ? 1 : 1, backgroundColor:'#FFFFFF'}]}>
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
              style={[styles.headerTxt, {marginEnd:moderateScale(5),backgroundColor: colors.openOrange}]}>
              Tükendi
            </Text>
          )}
          {favItem.isNew ? (
            <View>
              <Text style={[styles.headerTxt, {backgroundColor:'white',color: colors.greenColor}]}>
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
              size={wp('4%')}
              color={colors.openGreen}
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
            <Text style={styles.kmText}>
              {favItem.rate}
            </Text>
            <View style={{marginStart:moderateScale(20),flexDirection:'row'}}>
               <FontAwesome name="road" size={wp('4%')} color="white" style={{marginTop:verticalScale(2.5)}} />

            <Text style={styles.kmText}>
              {favItem.distance} km
            </Text>
            </View>
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
    height: hp('21.4%'),
    borderRadius: moderateScale(10),
    width: wp('75%'),
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
    borderRadius: moderateScale(10),
    zIndex: 1, 
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
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
    paddingHorizontal: hp('1.6%'), // Approximately 8 px
    marginTop: wp('2%'), // Approximately 5 px
    zIndex: 2,
    marginStart: moderateScale(7.5),
  },
  headerTxt: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: moderateScale(10.25), // Approximately 8.5 px
    fontWeight: '400',
    alignSelf: 'center',
    lineHeight: hp('2%'), // Approximately 10 px
    width: wp('12.45%'), // Approximately 36 px
    paddingHorizontal: 0,
    paddingVertical: hp('0.25%'), // Approximately 2 px
    borderRadius: wp('6.25%'), // Approximately 25 px
  },
  newContainer: {
    alignItems: 'center',
    borderRadius: wp('6.25%'),
    width: wp('11%'), // Approximately 35 px
    backgroundColor: 'white',
    marginLeft: wp('0.5%'), // Approximately 5 px
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6.25%'), // Approximately 25 px
    flexDirection: 'row',
    marginStart: moderateScale(-2.5), // Approximately -3 px
  },
  text: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: wp('2.75%'), // Approximately 11 px
    fontWeight: '600',
    alignSelf: 'center',
    lineHeight: hp('1.25%'), // Approximately 10 px
  },
  favoriteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  favoriteIcon: {
    width: wp('7%'), // Approximately 18.5 px
    height: hp('3.5%'), // Approximately 17.75 px
    backgroundColor: 'white',
    padding: wp('1.2%'), // Approximately 4.8 px
    borderRadius: wp('12.5%'), // Approximately 100 px
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: wp('0.25%')
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
    paddingHorizontal: moderateScale(10),
    zIndex: 111,
    marginStart: moderateScale(5),
  },
  bottomLeft: {
    width: wp('50%'),
    marginTop: moderateScale(0),
    marginBottom: verticalScale(6.15),
  },
  logoContainer: {
    flexDirection: 'row',
    width: wp('42.5%'), // Approximately 157.5 px
    alignItems: 'center',
    marginBottom: hp('1.15%'), // Approximately 6.5 px
  },
  cardPrice: {
    position: 'relative',
    width: wp('16%'), // Approximately 75 px
    top: hp('7.65%'), // Approximately 2.5 px
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.openGreen,
    borderRadius: moderateScale(10),
    height: hp('3.75%'),
    marginBottom: verticalScale(7.5),
    marginEnd: moderateScale(3.5),
    },
  textPrice: {
    fontSize: wp('4%'), // Approximately 16 px
    color: colors.tabBarBg,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  logo: {
    width: wp('9.01%'), // Approximately 20 px +2.65
    height: hp('4.25%'), // Approximately 20 px + 1.25
    borderRadius: wp('5%'), // Approximately 20 px
    backgroundColor: colors.tabBarBg,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: '400',
    color: colors.cardText,
    marginLeft: moderateScale(5),
    fontSize: moderateScale(14),
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
    borderRadius: wp('2.6%'), // Approximately 10 px
    paddingHorizontal: wp('2.65%'), // Approximately 4 px
    alignSelf: 'flex-start',
    marginTop: hp('0%'), // Approximately -2.75 px
    height: hp('2.85%'),
    marginBottom:verticalScale(5),
  },
  time: {
    fontSize: moderateScale(11), // Approximately 8.95 px
    color: colors.tabBarBg,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: hp('2.55%'), // Approximately 11.5 px
    bottom: hp('0%'), // Approximately 1 px
  },
  starandKm: {
    flexDirection: 'row',
    paddingTop: verticalScale(4),
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  star: {
    width: wp('3.85%'), // Approximately 8 px
    height: hp('1.75%'), // Approximately 7.5 px
    tintColor: colors.openGreen,
  },
  labelText: {
    fontSize: moderateScale(8),
    fontWeight: '400',
    color: colors.tabBarBg,
    marginLeft: moderateScale(4),
  },
  kmText: {
    fontSize: moderateScale(13), // Approximately 8 px
    fontWeight: '400',
    color: colors.tabBarBg,
    marginLeft: moderateScale(6), // Approximately 4 px
  },
});
