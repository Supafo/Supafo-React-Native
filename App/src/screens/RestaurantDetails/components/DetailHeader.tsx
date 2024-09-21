import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/firestore';
import Share, {ShareOptions} from 'react-native-share';
import {BasketGreen} from '../../../assets/images';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import responsiveScale from '../../../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

type Props = {
  item: any;
};

const logoImages = {
  'Burger King': require('../../../assets/images/burger-king-logo.png'),
  "Mc Donald's": require('../../../assets/images/mc-dolands-logo.png'),
  'Little Caesars': require('../../../assets/images/littleceaser-logo.png'),
  "Arby's": require('../../../assets/images/arbys-logo.png'),
  'Popoyes': require('../../../assets/images/popoyes-logo.jpg'),
  'Maydonoz Döner': require('../../../assets/images/maydonoz-logo.png'),
  'Kardeşler Fırın': require('../../../assets/images/kardesler-fırın-logo.jpg'),
  'Simit Sarayı': require('../../../assets/images/simir-sarayı-logo.png'),
  'Simit Center': require('../../../assets/images/simit-center-logo.jpg'),
};

const DetailHeader = ({item: initialItem}: Props) => {
  const [pressed, setPressed] = useState(initialItem?.isFavorite ?? false);
  const [docId, setDocId] = useState<string | null>(null);
  const [item, setItem] = useState(initialItem);
  const [logoSource, setLogoSource] = useState();

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
      const favoritesDoc = await firebase()
        .collection(userId)
        .doc('favorites')
        .collection('items')
        .get();

      if (!favoritesDoc.exists) {
        await firebase()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .doc(favs.id)
          .set(favs);
      }

      if (!pressed) {
        const newDocRef = await firebase()
          .collection(userId)
          .doc('favorites')
          .collection('items')
          .doc(favs.id)
          .set({...favs, isFavorite: true});

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

        await firebase()
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
      logoImages[item.name] ||
      require('../../../assets/images/burger-king-img.png');
    setLogoSource(logo);
  }, [item.name]);

  const showSheet = async () => {
    await Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <View style={styles.main}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.5)']} 
        style={styles.gradient}
      />
      <View style={styles.headerButtons}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <View style={styles.Icon}>
              <Feather
                name="arrow-left"
                size={scale(15.25)}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: moderateScale(10),
            gap: moderateScale(10),
          }}>
          <TouchableOpacity
            onPress={() => {
              showSheet();
            }}
            style={styles.button}>
            <View style={styles.Icon}>
              <Feather
                name="share-2"
                size={scale(15.25)}
                color={colors.greenColor}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CartTabScreen')}>
            <View style={styles.Icon}>
              <Feather
                name="shopping-cart"
                size={scale(15.25)}
                color={colors.greenColor}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={{uri: item.photoUrl}}
        style={styles.img}
      />
      <View style={styles.label}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image source={logoSource} style={styles.logo} />
          <Text style={styles.labelTxt}>{item?.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => addFavItemToFirebase(item)}
          style={{
            bottom:verticalScale(57.5),
            backgroundColor: '#fff',
            borderRadius: moderateScale(25),
          }}>
          <Icon
            name={item?.isFavorite ? 'heart' : 'heart-outline'}
            size={scale(18)}
            color={colors.openOrange}
            style={{
              margin: moderateScale(3),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    width: '100%',
    height: verticalScale(180),
    backgroundColor: 'white',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  headerButtons: {
    position: 'relative',
    top: 0,
    left: 0,
    zIndex: 2, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: moderateScale(8),
    marginTop: moderateScale(0),
    marginLeft:moderateScale(10),
    paddingEnd: moderateScale(17.5),
  },
  button: {
    backgroundColor: 'white',
    padding: moderateScale(2),
    borderRadius: moderateScale(100),
  },
  icon: {
    width: scale(15),
    height: scale(15),
    margin: moderateScale(4),
  },
  img: {
    width: '100%',
    height: '100%',
    bottom: moderateScale(40),
    resizeMode: 'cover',
    zIndex: 0, 
  },
  label: {
    position: 'relative',
    bottom: verticalScale(30),
    left: moderateScale(0),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    margin: moderateScale(10),
    zIndex: 2, 
  },
  logo: {
    bottom: moderateScale(70),
    width: scale(35),
    height: verticalScale(35),
    borderRadius: moderateScale(20),
    backgroundColor: colors.tabBarBg,
    resizeMode: 'contain',
  },
  labelTxt: {
    bottom: moderateScale(70),
    fontSize: moderateScale(16),
    color: 'white',
    paddingStart: moderateScale(7.5),
    fontWeight: '600'
  },
  Icon: {
    backgroundColor: 'white',
    padding: moderateScale(2),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
