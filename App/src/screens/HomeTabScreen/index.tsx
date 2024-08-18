import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  FlatList,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import {
  SearchIcon,
  DonateBackgroundImage,
  DonateIcon,
} from '../../assets/images';
import { LocationInput } from '../../components/LocationInput';
import HeadingText from '../../components/HeadingText';
import { Donate } from '../../components/Donate';
import BookStatus from '../../components/BookStatus';
import { CardSwiper } from '../../components/CardSwiper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { userId } from '../../store/slices/setUserId';
import Modal from 'react-native-modal';
import MapViewModal from '../../components/MapViewModal';
import Slider from '@react-native-community/slider';
import CardList from '../../components/CardList';
import { FlashList } from '@shopify/flash-list';
import { colors } from '../../theme/colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import ArrowDown from '../../assets/images/bottombaricons/arrow-down.svg';

export default function HomeTabScreen() {
  const [homeItems, setHomeItems] = useState([]);
  const [items, setItems] = useState([]);
  const [slider, setSlider] = useState(500);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [packageItems, setPackageItems] = useState([]);
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [breakfastItems, setBreakfastItems] = useState([]);

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

    return () => unsubscribe();
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
        documents.push({ id: doc.id, ...data });
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
        documents.push({ id: doc.id, ...data });
      });

      setHomeItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const getNewPackage = async () => {
    try {
      const cartCollection = await firestore()
        .collection('newSurprisepackage')
        .doc('packageList')
        .collection('items')
        .get();
      const documents: any = [];

      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({ id: doc.id, ...data });
      });

      setPackageItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const getBreakfastItems = async () => {
    try {
      const cartCollection = await firestore()
        .collection('breakfastItems')
        .doc('breakfastList')
        .collection('items')
        .get();
      const documents: any = [];

      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({ id: doc.id, ...data });
      });

      setBreakfastItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
          setIsOrdered(false);
          setStatus('null');
          return;
        }

        const orderDoc = ordersSnapshot.docs[0];
        const orderData = orderDoc.data();

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
  }, [id]);

  useEffect(() => {
    getDocuments();
    getItems();
    getNewPackage();
    getBreakfastItems();
  }, []);

  const filteredHomeItems = useMemo(() => {
    if (searchQuery.length === 0) {
      return homeItems;
    }
    return homeItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, homeItems]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}>
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
        <View style={{ flex: 1 }}>
          <View style={{ flex: 2 }}>
            <TouchableOpacity onPress={toggleModal} 
            style={{alignItems:'center',
            justifyContent:'center',
            marginTop:verticalScale(20),
            height:verticalScale(30),
            backgroundColor:'lightgray',
            borderWidth:1,
            borderColor:'#66AE7B',
            }}>
              <Text style={{color:'black'}}>
                Konum
              </Text>
            </TouchableOpacity>
            <MapViewModal slider={slider} />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text
            style={{
              fontWeight: '500',  
              fontSize: moderateScale(11.5),  
              color: '#000000',}}>
              Mesafeyi Ayarla
            </Text>
            <Slider
              style={{ width: '90%', height: verticalScale(50) }}
              minimumValue={0}
              maximumValue={2000}
              minimumTrackTintColor="#66AE7B"
              maximumTrackTintColor="rgba(115, 115, 115, 0.25)"
              thumbTintColor="#66AE7B"
              onValueChange={value => setSlider(value)}
              value={slider}
            />
            <View
              style={{
              width:'87%',
              backgroundColor:'white',
              borderRadius:moderateScale(32),
              borderColor:'#D0D5DD'}}>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.input,{height:verticalScale(35)}]}
                  placeholder="Ülke/Şehir Ara"
                  placeholderTextColor={'gray'}
                />
                <Image
                  source={SearchIcon}
                  style={{ width: moderateScale(20), height: verticalScale(20), position: 'absolute', marginStart: moderateScale(10) }}
                />
              </View>
            </View>
            <TouchableOpacity
            onPress={() => {}}
            style={{width:'85%',height:verticalScale(42.5),borderRadius:moderateScale(18),backgroundColor:'#66AE7B',alignItems:'center',justifyContent:'center'}}>
              <Text
              style={{fontSize:moderateScale(15),color:'white',fontWeight:'700'}}>
                Uygula
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.inputView}>
        <TextInput
          onChangeText={text => setSearchQuery(text)}
          placeholder="Ara..."
          style={styles.input}
          placeholderTextColor={'gray'}
          value={searchQuery}
        />
        <Image
          source={SearchIcon}
          style={{ width: moderateScale(20), height: verticalScale(20), position: 'absolute', marginStart: moderateScale(10) }}
        />
      </View>
      {searchQuery?.length > 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: moderateScale(20),
            paddingTop: verticalScale(20),
          }}>
          <View
            style={{
              width: moderateScale(80),
              borderRadius: 25,
              height: verticalScale(35),
              borderWidth: 1,
              borderColor: 'rgba(102, 174, 123, 1)',
              justifyContent: 'space-between',
              paddingLeft: moderateScale(15),
              paddingRight: moderateScale(10),
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{ color: 'rgba(51, 51, 51, 1)' }}>Sırala</Text>
            <View
              style={{
                gap: 10,
              }}>
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <ArrowDown />
              </View>
              <View>
                <ArrowDown />
              </View>
            </View>
          </View>
          <View
            style={{
              width: moderateScale(80),
              borderRadius: moderateScale(25),
              marginLeft: moderateScale(10),
              height: verticalScale(35),
              borderWidth: moderateScale(1),
              borderColor: 'rgba(102, 174, 123, 1)',
              justifyContent: 'space-between',
              paddingLeft: moderateScale(15),
              paddingRight: moderateScale(10),
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{ color: 'rgba(51, 51, 51, 1)' }}>Filtre</Text>
            <View
              style={{
                gap: 10,
              }}>
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <ArrowDown />
              </View>
              <View>
                <ArrowDown />
              </View>
            </View>
          </View>
        </View>
      )}

      {isOrdered ? (
        <View 
        style={{ 
          marginTop: moderateScale(12),
          marginBottom: moderateScale(12), 
          alignItems: 'center', }}>
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

      <View style={{ marginTop: verticalScale(16) }}>
        <View style={{ marginBottom: verticalScale(10) }}>
          <HeadingText title="Haftanın Yıldızları" />
        </View>

        <CardSwiper data={filteredHomeItems} />

        <View style={{ marginBottom: verticalScale(10) }}>
          <HeadingText title="Yeni Sürpriz Paketler" />
        </View>

        <View>
          <FlatList
            data={packageItems}
            renderItem={({ item }) => {
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
            ItemSeparatorComponent={() => <View style={{ width: moderateScale(10) }} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ width: moderateScale(20) }}></View>}
            ListHeaderComponent={<View style={{ width: moderateScale(20) }}></View>}
          />
        </View>

        <View style={{ marginTop: verticalScale(20), marginBottom: verticalScale(10) }}>
          <HeadingText title="Sizin için önerilen" />
        </View>

        <View>
          <FlatList
            data={filteredHomeItems}
            renderItem={({ item }) => {
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
            ItemSeparatorComponent={() => <View style={{ width: moderateScale(10) }} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ width: moderateScale(20) }}></View>}
            ListHeaderComponent={<View style={{ width: moderateScale(20) }}></View>}
          />
        </View>

        <View style={{ marginTop: verticalScale(20), marginBottom: verticalScale(10) }}>
          <HeadingText title="Kahvaltılık" />
        </View>

        <View>
          <FlatList
            data={breakfastItems}
            renderItem={({ item }) => {
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
            ItemSeparatorComponent={() => <View style={{ width: moderateScale(10) }} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ width: moderateScale(20) }}></View>}
            ListHeaderComponent={<View style={{ width: moderateScale(20) }}></View>}
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

      {items && items.length !== 0 ? (
        <View>
          <View style={{ marginTop: verticalScale(20) }}>
            <HeadingText title="Favorilerim" />
          </View>

          <View>
            <FlatList
              data={items}
              renderItem={({ item }) => {
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
              ItemSeparatorComponent={() => <View style={{ width: moderateScale(10) }} />}
              contentContainerStyle={{ paddingVertical: verticalScale(5) }}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={<View style={{ width: moderateScale(20) }}></View>}
              ListHeaderComponent={<View style={{ width: moderateScale(20) }}></View>}
            />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputView: {
    marginTop: verticalScale(10),
    marginHorizontal: moderateScale(20),
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
    fontSize: moderateScale(14),
    color: '#333333',
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    paddingStart: moderateScale(40),
    borderColor: '#D0D5DD',
    borderWidth: moderateScale(1),
    padding: moderateScale(5),
  },
  dot: {
    backgroundColor: 'orange',
    width: moderateScale(8),
    height: verticalScale(8),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(3),
  },
  activeDot: {
    backgroundColor: 'white',
  },
  pagination: {
    bottom: verticalScale(10),
  },
  swiper: {
    flex: 1,
    height: verticalScale(200),
  },
  shadow: {
    elevation: 2,
    shadowColor: '#52006A',
  },
});
