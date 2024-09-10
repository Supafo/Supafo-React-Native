import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import StarIcon from '../assets/images/starIcon.png';
import {colors} from '../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Share, {ShareOptions} from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import responsiveScale from '../utils/responsiveScale';

const{scale, verticalScale, moderateScale} = responsiveScale;

const screenWidth = Dimensions.get('window').width;
const largeCardWidth = screenWidth - 40;

type Prop = {
  data: any;
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

export const Card = ({data}: Prop) => {
  const [pressed, setPressed] = useState(data?.isFavorite ?? false);
  const [docId, setDocId] = useState<string | null>(null);
  const [item, setItem] = useState(data);
  const [logoSource, setLogoSource] = useState();

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
          if (data.id === item.id) {
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
  
  }, [item.id, userId]);


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
          .doc(item.id)
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
          .doc(item.id)
          .set({ ...favItem, isFavorite: true });
  
        setDocId(item.id);
        setPressed(true);
        setItem((prevItem) => ({ ...prevItem, isFavorite: true }));
        console.log('Item added to favorites successfully', item.id);
      } else if (docId) {
        await firestore()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .doc(docId)
          .delete();
  
        setDocId(null);
        setPressed(false);
        setItem((prevItem) => ({ ...prevItem, isFavorite: false }));
        console.log('Item removed from favorites successfully');
      }
    } catch (error) {
      console.error('Error managing item in favorites: ', error);
    }
  };

  const [messageToShare, setMessageToShare] = useState(
    item?.name ?? 'messageToShare',
  );

  const options: ShareOptions = {
    email: 'test@test.com',
    failOnCancel: true,
    saveToFiles: true,
    showAppsToView: true,
    excludedActivityTypes: [
      'mail',
      'airDrop',
      'copyToPasteBoard',
      'mail',
      'markupAsPDF',
      'message',
      'postToFacebook',
      'postToTwitter',
    ],
    type: 'text',
    message: messageToShare,
    title: '',
  };

  useEffect(() => {
    const logo =
      logoImages[item.name] || require('../assets/images/burger-king-img.png');
    setLogoSource(logo);
  }, [item.name]);

  const showSheet = async () => {
    await Share.open(options)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        err && console.log(err);
      });
  };
  
  
  return (
    <View style={[styles.card, {width: largeCardWidth}, {opacity: item.lastProduct === 'Tükendi' ? 0.6 : 1, backgroundColor:'#FFFFFF'}]}>
      <Image
        source={{uri: item.photoUrl}}
        style={styles.image}
      />
       <LinearGradient 
         start={{x: 0, y: item.lastProduct === 'Tükendi' ? 0 : 1}} 
         end={{x: 0, y: 0}} 
         colors={item.lastProduct === 'Tükendi' 
           ? ['transparent', 'transparent'] 
           : ['#000000', 'transparent']} 
         style={styles.gradient}
      />
      <View style={styles.cardTop}>
        <View style={[styles.lastNumber,{width: item.lastProduct === 'Tükendi' ? moderateScale(120):null}]}>
          {item.lastProduct !== 'Tükendi' ? (
           Number(item.lastProduct) <= 5 ?
           <Text
           style={[styles.headerTxt, {backgroundColor: colors.greenColor,paddingHorizontal:moderateScale(0),marginStart:moderateScale(5)}]}>
           Son {item.lastProduct}
         </Text>
         :
         null
          ) : (
            <Text
              style={[styles.headerTxt, {marginStart: moderateScale(-25),paddingHorizontal: moderateScale(0),backgroundColor: colors.openOrange}]}>
              Tükendi
            </Text>
          )}

          {item.isNew ? (
            <View style={styles.newContainer}>
              <Text style={[styles.headerTxt, {color: colors.greenColor}]}>
                Yeni
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.iconContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              addFavItemToFirebase(item);
            }}
            style={styles.favoriteIconContainer}>
            <View style={[styles.favoriteIcon, {marginEnd: moderateScale(5)}]}>
              <AntDesign
                name={item.isFavorite ? "heart" : "hearto"}
                size={moderateScale(10.5)}
                color={colors.openOrange}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              showSheet();
            }}
            style={styles.favoriteIconContainer}>
            <View style={styles.favoriteIcon}>
              <AntDesign
                name="sharealt"
                size={moderateScale(10.5)}
                color={colors.greenColor}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.bottomLeft}>
          <View style={styles.cardBottomDinner}>
            <Image style={styles.dinnerPng} source={logoSource} />
            <Text style={styles.dinnertext}>{item.name}</Text>
          </View>

          <View style={styles.timebg}>
            <Text style={styles.time}>Bugün: {item.time}</Text>
          </View>

          <View style={styles.starandKm}>
            <Image style={styles.star} source={StarIcon} />
            <Text style={styles.kmText}>
              {item.rate} | {item.distance} km
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <View style={styles.cardPrice}>
            <Text style={styles.textPrice}>₺{item.discountPrice}</Text>
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
    height: verticalScale(117),
    alignSelf: 'center',
    borderRadius: moderateScale(15),
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',  
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
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
    paddingHorizontal: verticalScale(10),
    zIndex: 2,  
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
    top: moderateScale(2.5),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    marginStart: moderateScale(-3),
  },
  text: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: moderateScale(11),
    fontWeight: '600',
    alignSelf: 'center',
    lineHeight: moderateScale(10),
  },
  headerTxt: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: moderateScale(8.5),
    fontWeight: '500',
    alignSelf: 'center',
    lineHeight: verticalScale(10), 
    width: scale(36),
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(25),
  },
  newContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(25),
    width: scale(35),
    backgroundColor: 'white',
    marginLeft: moderateScale(5),
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: moderateScale(15),
  },
  textPrice: {
    fontSize: moderateScale(16),
    color: colors.tabBarBg,
    fontWeight: '600',
    fontFamily: 'Inter',
    top: moderateScale(0)
  },
  current: {
    fontSize: moderateScale(15),
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
    borderRadius: moderateScale(15),
  },
  dinnerPng: {
    width: scale(20),
    height: verticalScale(20),
    borderRadius: moderateScale(20),
    backgroundColor: colors.tabBarBg,
    resizeMode: 'contain',
    top: moderateScale(1.5),
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
      width: moderateScale(1.5),
      height: verticalScale(0.5),
    },
  },
  favoriteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  favoriteIcon: {
    width: scale(18.5),
    height: verticalScale(17.75),
    backgroundColor: 'white',
    padding: moderateScale(4.8),
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    backgroundColor: 'white',
    padding: moderateScale(4),
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width:  scale(12),
    height: verticalScale(12),
  },
  kmText: {
    fontSize: moderateScale(8),
    fontWeight: '400',
    color: colors.tabBarBg,
    marginLeft: moderateScale(4),
  },
  starandKm: {
    flexDirection: 'row',
    paddingTop: verticalScale(4),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  star: {
    width: scale(8),
    height: verticalScale(7.5),
    tintColor: colors.openGreen,
  },
  time: {
    fontSize: moderateScale(8.95),
    color: colors.tabBarBg,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: verticalScale(11.5),
    bottom: moderateScale(1),
  },
  timebg: {
    backgroundColor: colors.openGreen,
    borderRadius: 10,
    paddingHorizontal: moderateScale(4),
    alignSelf: 'flex-start',
    marginTop: moderateScale(-2.75),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: verticalScale(8),
    marginTop: moderateScale(5),
    zIndex: 2,  
  },
  iconContainer: {
    flexDirection: 'row',
    zIndex: 999,
    position: 'absolute',
    right: moderateScale(15),
    top: 0,
  },
});
