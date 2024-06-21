import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  SearchIcon,
  DonateBackgroundImage,
  DonateIcon,
} from '../../assets/images';
import {LocationInput} from '../../components/LocationInput';
import HeadingText from '../../components/HeadingText';
import {Donate} from '../../components/Donate';
import BookStatus from '../../components/BookStatus';
import {FlatList} from 'react-native-gesture-handler';
import {CARDS_SWIPER_DATA} from '../../data/cards';
import {CardSwiper} from '../../components/CardSwiper';
import {useNavigation} from '@react-navigation/native';
import {cardList} from '../../data/cardList';
import CardList from '../../components/CardList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { userId } from '../../store/slices/setUserId';

export default function HomeTabScreen() {
  const navigation = useNavigation();

  const isOrdered = useSelector(
    (state: RootState) => state.detailOfOrder.isOrdered,
  );
  const status = useSelector(
    (state: RootState) => state.detailOfOrder.detailOfOrder,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        dispatch(userId(currentUser.uid));
      } else {
        dispatch(userId(''));
        console.log('Error while set userId, in App');
      }
    });

    return () => unsubscribe(); // Unsubscribe on unmount
  }, []);

  const id = useSelector((state: RootState) => state.setUserId.id);
  
  const [items, setItems] = useState()

  const getDocuments = async () => {
    if (!id) {
      console.warn('User ID is not available yet');
      return;
    }
  
    try {
      const cartCollection = await firestore().collection(id).doc('favorites').collection('items').get();
      const documents: any = [];
  
      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({ id: doc.id, ...data });
        
      });

      const allItems = documents.flatMap((doc: any) => doc.items);
      setItems(documents);
  
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, [items])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <LocationInput distance={10} title="Istiklal Park" />
        <Image
          source={require('../../assets/images/arrow-bottom.png')}
          style={{right: 15, position: 'absolute', height: 10, width: 15}}
        />
      </TouchableOpacity>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Ara..."
          style={styles.input}
          placeholderTextColor={'gray'}
        />
        <Image
          source={SearchIcon}
          style={{width: 20, height: 20, position: 'absolute', marginStart: 10}}
        />
      </View>

      {isOrdered ? (
        <View className="mt-3 mb-3 items-center">
          <BookStatus
            status={
              status == 'PreparingOrder'
                ? 'preparing'
                : status == 'OrderDelivered'
                ? 'delivered'
                : status == 'OrderCompleted'
                ? 'completed'
                : 'null'
            }
          />
        </View>
      ) : null}

      <View className="mb-1">
        <HeadingText title="Haftanın Yıldızları" />
      </View>

      <CardSwiper data={CARDS_SWIPER_DATA} />

      <View className="mt-3">
        <HeadingText title="Yeni Sürpriz Paketler" />
      </View>

      <View className="mt-2 ml-2.5">
        <FlatList
          data={cardList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                   item: item
                  })
                }>
                <CardList item={item} />
              </TouchableOpacity>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          contentContainerStyle={{paddingVertical: 15}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View className="mt-3">
        <HeadingText title="Sizin için önerilen" />
      </View>

      <View className="mt-2 ml-2.5">
        <FlatList
          data={cardList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    item: item
                  })
                }>
                <CardList item={item} />
              </TouchableOpacity>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View className="mt-3">
        <HeadingText title="Kahvaltılık" />
      </View>

      <View className="mt-2 ml-2.5">
        <FlatList
          data={cardList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    item: item
                  })
                }>
                <CardList item={item} />
              </TouchableOpacity>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View className="mt-3">
        <HeadingText title="Öğle Yemeği" />
      </View>

      <View className="mt-2 ml-2.5">
        <FlatList
          data={cardList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    item: item
                  })
                }>
                <CardList item={item}/>
              </TouchableOpacity>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View className="mt-3">
        <Donate
          backgroundImage={DonateBackgroundImage}
          isAvailable={false}
          icon={DonateIcon}
          title="Bağış Yapmak İster Misin ?"
          button={{
            variant: 'light',
            rounded: true,
          }}
          buttonTitle="Bağış yap"
        />
      </View>

      <View className="mt-3">
        <HeadingText title="Favorilerim" />
      </View>

      <View className="mt-2 ml-2.5">
        <FlatList
          data={items}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    item: item
                  })
                }>
                <CardList item={item} />
              </TouchableOpacity>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputView: {
    margin: 10,
    justifyContent: 'center',
  },

  input: {
    fontSize: 14,
    color: '#333333',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingStart: 40,
    borderColor: '#D0D5DD',
    borderWidth: 1,
    padding: 5,
  },
  dot: {
    backgroundColor: 'orange',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  pagination: {
    bottom: 10,
  },
  swiper: {
    flex: 1,
    height: 200,
  },
  shadow: {
    elevation: 2,
    shadowColor: '#52006A',
  },
});
