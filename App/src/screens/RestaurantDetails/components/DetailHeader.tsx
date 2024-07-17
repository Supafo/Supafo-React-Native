import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme/colors';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import Share, {ShareOptions} from 'react-native-share';
import Basket from '../../../assets/images/bottombaricons/sepet-pasif-svg.svg';
import HeartActive from '../../../assets/images/heartactive.svg';
import HeartPassive from '../../../assets/images/heartpassive.svg';

type Props = {
  item: any;
};

const DetailHeader = ({item: initialItem}: Props) => {
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
      <View style={styles.headerButtons}>
        <View>
          <TouchableOpacity
            style={[styles.button, {flex: 1}]}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/arrow-back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              showSheet();
            }}
            style={styles.button}>
            <Image
              source={require('../../../assets/images/shareIcon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              height: 30,
              width: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            }}
            onPress={() => navigation.navigate('CartTabScreen')}>
            <Basket />
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={require('../../../assets/images/restaurant-img.png')}
        style={styles.img}
      />
      <View style={styles.label}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/burger-king-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.labelTxt}>{item?.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => addFavItemToFirebase(item)}
          style={{backgroundColor: '#fff', borderRadius: 25}}>
          {/* {item?.isFavorite ? <HeartActive /> : <HeartPassive />} */}

          <Icon
            name={item?.isFavorite ? 'heart' : 'heart-outline'}
            size={scale(20)}
            color={colors.openOrange}
            // margin={scale(3)}
            style={{
              margin: scale(3),
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
    height: 230,
    backgroundColor: 'white',
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: scale(8),
  },
  button: {
    backgroundColor: 'white',
    padding: scale(2),
    borderRadius: 100,
    margin: scale(8),
  },
  icon: {
    width: scale(15),
    height: scale(15),
    tintColor: 'black',
    margin: scale(4),
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 0,
  },
  label: {
    position: 'absolute',
    bottom: 3,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  logo: {
    marginStart: 10,
  },
  labelTxt: {
    fontSize: 18,
    color: 'white',
    padding: 10,
  },
});
