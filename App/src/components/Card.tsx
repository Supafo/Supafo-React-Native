import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import StarIcon from '../assets/images/starIcon.png';
import {colors} from '../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Share, {ShareOptions} from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../utils/responsiveScale';

const{scale, verticalScale, moderateScale} = responsiveScale;

const screenWidth = Dimensions.get('window').width;
const largeCardWidth = screenWidth - moderateScale(40);

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

  const colors = {
    greenColor: '#4CAF50',
    openOrange: '#FF5722',
    splashtext: '#FFFFFF',
    openGreen: '#4CAF50',
    tabBarBg: '#FFFFFF',
    cardText: '#000000',
  };

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
    <View
      style={[
        styles.card,
        { width: largeCardWidth },
        {
          opacity: item.lastProduct === 'Tükendi' ? 1 : 1,
          backfaceVisibility:'visible',
          backgroundColor: '#FFFFFF',
        },
      ]}
    >
      <Image source={{ uri: item.photoUrl }} style={styles.image} />
      <LinearGradient
        start={{ x: 0, y: item.lastProduct === 'Tükendi' ? 0 : 1 }}
        end={{ x: 0, y: 0 }}
        colors={
          item.lastProduct === 'Tükendi'
            ? ['transparent', 'transparent']
            : ['#000000', 'transparent']
        }
        style={styles.gradient}
      />
      <View style={styles.cardTop}>
        <View
          style={[
            styles.lastNumber,
            { width: item.lastProduct === 'Tükendi' ? wp('30%') : null },
          ]}
        >
          {item.lastProduct !== 'Tükendi' ? (
            Number(item.lastProduct) <= 5 ? (
              <Text
                style={[
                  styles.headerTxt,
                  {
                    backgroundColor: '#66AE7B',
                    paddingHorizontal: 0,
                    marginStart: wp('0.5%'),
                    marginEnd: wp('1.25%'),
                  },
                ]}
              >
                Son {item.lastProduct}
              </Text>
            ) : null
          ) : (
            <Text
              style={[
                styles.headerTxt,
                {
                  marginEnd: wp('1.25%'),
                  marginStart: wp('-2.5%'),
                  paddingHorizontal: 0,
                  width: wp('14%'),
                  backgroundColor: colors.openOrange,
                },
              ]}
            >
              Tükendi
            </Text>
          )}

          {item.isNew ? (
            <View style={styles.newContainer}>
              <Text style={[styles.headerTxt, { color: colors.openGreen }]}>
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
          >
            <View style={[styles.favoriteIcon, { marginEnd: wp('3%') }]}>
              <AntDesign
                name={item.isFavorite ? 'heart' : 'hearto'}
                size={wp('4.5%')}
                color={colors.openGreen}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              showSheet();
            }}
          >
            <View style={[styles.favoriteIcon, {marginEnd: wp('-0.75%')}]}>
              <AntDesign
                name="sharealt"
                size={wp('4.5%')}
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
              {item.rate}
            </Text>
            <View style={{marginStart:moderateScale(20),flexDirection:'row'}}>
               <FontAwesome name="road" size={wp('4%')} color="white" style={{marginTop:verticalScale(2.5)}} />

            <Text style={styles.kmText}>
              {item.distance} km
            </Text>
            </View>
           
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
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
    height: hp('21.4'), // Approximately 117 px on a standard 800 px height screen
    alignSelf: 'center',
    borderRadius: wp('4%'), // Moderate scale
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 2, // iOS shadow
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    borderRadius: wp('4%'),
    zIndex: 1,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.75%'), // Approximately 8 px
    paddingHorizontal: wp('2.5%'), // Approximately 10 px
    zIndex: 2,
    marginStart: moderateScale(5),
  },
  bottomLeft: {
    width: wp('34%'), // Approximately 130 px on a 375 px wide screen
  },
  cardBottomDinner: {
    flexDirection: 'row',
    width: wp('42.5%'), // Approximately 157.5 px
    alignItems: 'center',
    marginBottom: hp('1.15%'), // Approximately 6.5 px
  },
  cardPrice: {
    position: 'relative',
    width: wp('16%'), // Approximately 75 px
    top: hp('0.75%'), // Approximately 2.5 px
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.openGreen,
    borderRadius: moderateScale(10),
    height: hp('3.75%'),
    marginBottom: verticalScale(7.5),
    marginEnd: moderateScale(3.5),
  },
  lastNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6.25%'), // Approximately 25 px
    flexDirection: 'row',
    marginStart: moderateScale(-5), // Approximately -3 px
  },
  text: {
    color: colors.splashtext,
    textAlign: 'center',
    fontSize: wp('2.75%'), // Approximately 11 px
    fontWeight: '600',
    alignSelf: 'center',
    lineHeight: hp('1.25%'), // Approximately 10 px
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
  image: {
    width: '100%',
    height: '100%',
    marginEnd: moderateScale(10),
    position: 'absolute',
    borderRadius: wp('4%'),
  },
  textPrice: {
    fontSize: wp('4%'), // Approximately 16 px
    color: colors.tabBarBg,
    fontWeight: '600',
    fontFamily: 'Inter',
    top: 0,
  },
  current: {
    fontSize: wp('3.75%'), // Approximately 15 px
    color: colors.tabBarBg,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  textPriceFirst: {
    color: '#D0D5DD',
    fontSize: wp('3%'), // Approximately 12 px
    fontWeight: '700',
  },
  line: {
    position: 'absolute',
    width: wp('12.5%'), // Approximately 50 px
    borderWidth: 1,
    opacity: 0.8,
    borderColor: colors.openGreen,
    transform: [{ rotate: '170.81deg' }],
    zIndex: 2,
    borderRadius: wp('4%'),
  },
  dinnerPng: {
    width: wp('9.01%'), // Approximately 20 px +2.65
    height: hp('4.25%'), // Approximately 20 px + 1.25
    borderRadius: wp('5%'), // Approximately 20 px
    backgroundColor: colors.tabBarBg,
    resizeMode: 'contain',
  },
  dinnertext: {
    fontWeight: '400',
    color: colors.cardText,
    marginLeft: wp('2.25%'), // Approximately 5 px
    fontSize: wp('4.3%'), // Approximately 16 px
    textAlign: 'center',
    textShadowColor: '#333333',
    textShadowRadius: 1,
    textShadowOffset: {
      width: wp('0.4%'), // Approximately 1.5 px
      height: hp('0.06%'), // Approximately 0.5 px
    },
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
  },
  shareIcon: {
    backgroundColor: 'white',
    padding: wp('1%'), // Approximately 4 px
    borderRadius: wp('12.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp('3.2%'), // Approximately 12 px
    height: hp('1.5%'), // Approximately 12 px
  },
  kmText: {
    fontSize: moderateScale(13), // Approximately 8 px
    fontWeight: '400',
    color: colors.tabBarBg,
    marginLeft: moderateScale(6), // Approximately 4 px
  },
  starandKm: {
    flexDirection: 'row',
    paddingTop: hp('0.5%'), // Approximately 4 px
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  star: {
    width: wp('4%'), // Approximately 8 px
    height: hp('2%'), // Approximately 7.5 px
    tintColor: colors.openGreen,
  },
  time: {
    fontSize: moderateScale(11), // Approximately 8.95 px
    color: colors.tabBarBg,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: hp('2.55%'), // Approximately 11.5 px
    bottom: hp('0%'), // Approximately 1 px
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
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('1.6%'), // Approximately 8 px
    marginTop: wp('3%'), // Approximately 5 px
    zIndex: 2,
    marginStart: moderateScale(5),
  },
  iconContainer: {
    flexDirection: 'row',
    zIndex: 999,
    position: 'absolute',
    right: wp('4.2%'), // Approximately 15 px
    top: 0,
  },
});