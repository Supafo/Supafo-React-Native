import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  Button,
  FlatList,
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
import {CardSwiper} from '../../components/CardSwiper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userId} from '../../store/slices/setUserId';
import Modal from 'react-native-modal';
import MapViewModal from '../../components/MapViewModal';
import Slider from '@react-native-community/slider';
import {CARDS_SWIPER_DATA} from '../../data/cards';
import CardList from '../../components/CardList';
import fireStore from '@react-native-firebase/firestore';

export default function HomeTabScreen() {
  const [homeItems, setHomeItems] = useState([]);
  const [items, setItems] = useState([]);
  const [slider, setSlider] = useState(500);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const id = useSelector((state: RootState) => state.setUserId.id);

  const navigation = useNavigation();
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

  const getDocuments = async () => {
    if (!id) {
      console.warn('User ID is not available yet');
      return;
    }

    try {
      const cartCollection = await firestore()
        .collection(id)
        .doc('favorites')
        .collection('items')
        .get();
      const documents: any = [];

      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({id: doc.id, ...data});
      });

      setItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const getItems = async () => {
    try {
      const cartCollection = await firestore()
        .collection('homeItems')
        .doc('homeList')
        .collection('items')
        .get();
      const documents: any = [];

      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({id: doc.id, ...data});
      });

      setHomeItems(documents);
      setFilteredItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredItems(homeItems);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = homeItems.filter(item => {
        const title = item.title ? item.title.toLowerCase() : '';
        const description = item.description
          ? item.description.toLowerCase()
          : '';
        return (
          title.includes(lowercasedQuery) ||
          description.includes(lowercasedQuery)
        );
      });
      setFilteredItems(filtered);
    }
  };

  const [status, setStatus] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const userId = id;
        if (!userId) {
          console.warn('User ID is not set');
          return;
        }

        const ordersCollection = firestore()
          .collection(userId)
          .doc('orders')
          .collection('ordersList');
        const ordersSnapshot = await ordersCollection.get();

        if (ordersSnapshot.empty) {
          //console.warn('No orders found');
          setIsOrdered(false);
          setStatus('null');
          return;
        }

        const orderDoc = ordersSnapshot.docs[0];
        const orderData = orderDoc.data();
        console.log('Order Data:', orderData);

        if (orderData) {
          setStatus(orderData.status || 'null');
          setIsOrdered(true);
        } else {
          setStatus('null');
          setIsOrdered(false);
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, [id, status]);
  //console.log(status);

  useEffect(() => {
    getDocuments();
    getItems();
  }, [items]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <LocationInput distance={10} title="Istiklal Park" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <View style={{flex: 2}}>
            <Button title="Hide modal" onPress={toggleModal} />
            <MapViewModal slider={slider} />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text className="font-medium text-xs text-[#000]">
              Mesafeyi Ayarla
            </Text>
            <Slider
              style={{width: '85%', height: 50}}
              minimumValue={0}
              maximumValue={2000}
              minimumTrackTintColor="#66AE7B"
              maximumTrackTintColor="rgba(115, 115, 115, 0.25)"
              thumbTintColor="#66AE7B"
              onValueChange={value => setSlider(value)}
              value={slider}
            />
            <View className="w-3/4 bg-[#D0D5DD] rounded-[32px] border">
              <TextInput
                className="w-full rounded-[32px] pl-2 "
                placeholder="Ülke/Şehir Ara"
              />
            </View>
            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Ara..."
          style={styles.input}
          placeholderTextColor={'gray'}
          value={searchQuery}
          onChangeText={handleSearch}
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
              status === 'PreparingOrder'
                ? 'preparing'
                : status === 'OrderDelivered'
                ? 'delivered'
                : status === 'OrderCompleted'
                ? 'completed'
                : 'null'
            }
          />
        </View>
      ) : null}

      <View style={{marginTop: 16}}>
        <View style={{marginBottom: 10}}>
          <HeadingText title="Haftanın Yıldızları" />
        </View>

        <CardSwiper data={CARDS_SWIPER_DATA} />

        <View style={{marginBottom: 10}}>
          <HeadingText title="Yeni Sürpriz Paketler" />
        </View>

        <View>
          <FlatList
            data={filteredItems}
            renderItem={({item}) => {
              if (item.lastProduct === 'Tükendi') {
                return (
                  <View>
                    <CardList item={item} />
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RestaurantDetail', {
                        item: item,
                      });
                    }}>
                    <CardList item={item} />
                  </TouchableOpacity>
                );
              }
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{width: 20}}></View>}
            ListHeaderComponent={<View style={{width: 20}}></View>}
          />
        </View>

        <View style={{marginTop: 20, marginBottom: 10}}>
          <HeadingText title="Sizin için önerilen" />
        </View>

        <View>
          <FlatList
            data={filteredItems}
            renderItem={({item}) => {
              if (item.lastProduct === 'Tükendi') {
                return (
                  <View>
                    <CardList item={item} />
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RestaurantDetail', {
                        item: item,
                      });
                    }}>
                    <CardList item={item} />
                  </TouchableOpacity>
                );
              }
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{width: 20}}></View>}
            ListHeaderComponent={<View style={{width: 20}}></View>}
          />
        </View>

        <View style={{marginTop: 20, marginBottom: 10}}>
          <HeadingText title="Kahvaltılık" />
        </View>

        <View>
          <FlatList
            data={filteredItems}
            renderItem={({item}) => {
              if (item.lastProduct === 'Tükendi') {
                return (
                  <View>
                    <CardList item={item} />
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RestaurantDetail', {
                        item: item,
                      });
                    }}>
                    <CardList item={item} />
                  </TouchableOpacity>
                );
              }
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{width: 20}}></View>}
            ListHeaderComponent={<View style={{width: 20}}></View>}
          />
        </View>

        <View style={{marginTop: 20, marginBottom: 10}}>
          <HeadingText title="Öğle Yemeği" />
        </View>

        <View>
          <FlatList
            data={filteredItems}
            renderItem={({item}) => {
              if (item.lastProduct === 'Tükendi') {
                return (
                  <View>
                    <CardList item={item} />
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RestaurantDetail', {
                        item: item,
                      });
                    }}>
                    <CardList item={item} />
                  </TouchableOpacity>
                );
              }
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{width: 20}}></View>}
            ListHeaderComponent={<View style={{width: 20}}></View>}
          />
        </View>
      </View>

      <View>
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

      <View style={{marginTop: 20}}>
        <HeadingText title="Favorilerim" />
      </View>

      <View>
        {items && items.length === 0 ? (
          <Text
            style={{color: 'black', marginVertical: 10, paddingHorizontal: 20}}>
            Şu anda favorileriniz boş gözüküyor
          </Text>
        ) : null}
        <FlatList
          data={items}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    item: item,
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
          ListFooterComponent={<View style={{width: 20}}></View>}
          ListHeaderComponent={<View style={{width: 20}}></View>}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputView: {
    marginTop: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
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
