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
import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  SearchIcon,
  DonateBackgroundImage,
  DonateIcon,
  LocationIcon
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
//@ts-ignore
import Slider from 'react-native-slider';
import CardList from '../../components/CardList';
import { FlashList } from '@shopify/flash-list';
import { colors } from '../../theme/colors';
import ArrowDown from '../../assets/images/bottombaricons/arrow-down.svg';
import Input from '../../components/Input';
import IOSIcons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../../utils/responsiveScale';  
import { MONTH } from '../../constants/dateTimeFormat';

const {scale, verticalScale, moderateScale} = responsiveScale;

export default function HomeTabScreen() {
  const [homeItems, setHomeItems] = useState([]);
  const [items, setItems] = useState([]);
  const [slider, setSlider] = useState(500);
  const [isModalVisible, setModalVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [distance, setDistance] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [handleAddress, setHandleAddress] = useState('');
  const isfirstRendering = useRef(true)

  const [packageItems, setPackageItems] = useState([]);
  const [breakfastItems, setBreakfastItems] = useState([]);

  const id = useSelector((state: RootState) => state.setUserId.id);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAdressChange = (updatedAdress) => {
    if(updatedAdress){
      setAddress(updatedAdress);
    console.log(`newAdress ${updatedAdress}`)
    setAddress(updatedAdress)
    }
    else{
      throw new Error("no Adress")
    }
    
  }

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
      {/*
      const response = await fetch(`/api/favorites/${id}`); // update extreme point
      const documents = await response.json();
        * */}
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
  {/*
     // Yeni sipariş oluşturma
  const placeOrder = async (orderData) => {
    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error('Sipariş oluşturulurken hata oluştu');
      }
      const data = await response.json();
      console.log('Sipariş başarılı:', data);
    } catch (error) {
      console.error('Sipariş hatası:', error);
    }
  };

  // Paketleri alma
  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      setPackageItems(data);
    } catch (error) {
      console.error('Paketler alınırken hata:', error);
    }
  };

    * */}

  const getItems = async () => {
    try {
      {/*
         const response = await fetch('/api/home-items'); // update extreme point
      const documents = await response.json();* */}
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
      {/*
         const response = await fetch('/api/packages'); // API uç noktanıza göre güncelle
      const documents = await response.json();
      * */}
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
      {/*
        const response = await fetch('/api/breakfast-items'); // update extreme point
      const documents = await response.json();
      * */}
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

  
  const handleButtonClick = () => {
    setIsClicked(true)
    setSearchText('')
  };

  const fixedAddress = (address) => {
    if (address.length > 30) {
      return address.substring(0, 30) + '...';
    }
    return address;
  };

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const userId = id;
        if (!userId) {
          console.warn('User ID is not set');
          return;
        }
        {/*
           const response = await fetch(`/api/orders/${userId}`); // API uç noktanıza göre güncelle
        const orders = await response.json();
        * */}
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

  useEffect (() => {
    if(isfirstRendering.current){
      console.log(`bla bla`);
    }
    else{
      if(handleAddress && handleAddress.length> 0){
        setModalVisible(false)
      }
    }
  },[address]);

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
        <LocationInput distance={(slider/100).toFixed(0)} title={fixedAddress(address)} />
      </TouchableOpacity>
    <View>
      <Modal isVisible={isModalVisible}

      style={{margin:0}}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 2,height:verticalScale(35),width:'100%' }}>
            <View style={{flexDirection:'row',height:scale(35),width:'100%'}} >
              <View style={{flex:0.90,}}>
                 <TouchableOpacity onPress={() => setModalVisible(false)}
             
            style={{alignItems:'center',
            justifyContent:'center',
            paddingStart: moderateScale(12.5),
            marginTop:verticalScale(0),
            height:verticalScale(35),
            backgroundColor:'#E0E0E0',
            }}>
             <IOSIcons
            name="arrow-back-outline"
            style={{color: '#000000', fontSize: moderateScale(24)}}
          />
            </TouchableOpacity>
              </View>
              <View style={{flex:9,height:verticalScale(60),justifyContent:'center',alignItems:'center',
                backgroundColor:'#E0E0E0'}}>
                 <Text
            style={{fontSize:moderateScale(18),color:'#000000',top:moderateScale(-18),left:moderateScale(-18),}}>Konum</Text>
              </View>
            </View>
            
            <MapViewModal slider={slider} searchText={searchText} isClicked={isClicked} setIsClicked={setIsClicked} onAdressChange={handleAdressChange} />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 1.275,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              borderTopLeftRadius: moderateScale(17.5),
              borderTopEndRadius: moderateScale(17.5),
              marginTop: moderateScale(-25),
            }}>
            <Text
            style={{
              fontWeight: '500',  
              fontSize: moderateScale(13.5),
              top:verticalScale(5),  
              color: '#000000',}}>
              Mesafeyi Ayarla
            </Text>
            <View style={{flexDirection:'row',alignItems:'center',width:'100%', paddingStart:moderateScale(10)}}>
              <Slider
              style={{ width: '80%', height: verticalScale(50),marginHorizontal:moderateScale(10)}}
              thumbStyle={styles.thumbStyle}
              minimumValue={0}
              maximumValue={3000}
              minimumTrackTintColor="#66AE7B"
              maximumTrackTintColor="rgba(115, 115, 115, 0.2)"
              thumbTintColor="white"
              onValueChange={value => setSlider(value)}
              value={slider}
            />
            <Text style={{fontSize:14,color:'black',marginBottom:moderateScale(2)}}>
              {(slider/100).toFixed(0)} km
            </Text>
            </View>
            
              <View style={{marginStart:moderateScale(0),bottom:10}}>
                <Input
                  isSearchBar={true}
                  icon={SearchIcon}
                  iconStyle={{width:moderateScale(20),height:verticalScale(20),marginStart: moderateScale(5),marginEnd: moderateScale(7.5)}}
                  placeholder='Ülke/Şehir Ara'
                  style={{justifyContent:'center',color:'black',height:verticalScale(30),width:scale(245),fontSize:moderateScale(12),top:moderateScale(2)}}
                  placeholderTextColor={'gray'}
                  value={searchText}
                  onChangeText={setSearchText}
            />
              </View>
              <View style={{bottom:moderateScale(20)}}>
              <TouchableOpacity style={{marginBottom:moderateScale(0)}}
              onPress={
                handleButtonClick}>
                <View style={{flexDirection:'row' ,gap: moderateScale(10.5)}}>
                  <Image style={{width: scale(17),height:verticalScale(19.3)}}source={LocationIcon}></Image>
                  <Text style={{color:'#000000',fontSize:moderateScale(14.5)}}>
                  Konumumu Kullan
                </Text>
                </View>
                
              </TouchableOpacity>
              </View>
              
            <TouchableOpacity
            onPress={() => { 
              setHandleAddress(address)
              setModalVisible(false)
               }}
            style={{width:'88%',height:verticalScale(35),borderRadius:moderateScale(15),backgroundColor:'#66AE7B',alignItems:'center',justifyContent:'center'}}>
              <Text
              style={{fontSize:moderateScale(15),color:'white',fontWeight:'700'}}>
                Uygula
              </Text>
            </TouchableOpacity>
              
            
          </View>
        </View>
      </Modal>
    </View>
    <View style={{flexDirection:'row',marginStart:moderateScale(20),marginTop: verticalScale(20),marginBottom: verticalScale(17.5)}}>
      <View style={{
        borderRadius:moderateScale(14),
        width:wp('75.5%'),
        flexDirection:'row',
        borderColor:'#D0D5DD',
        borderWidth:0.5,
        height:hp('4.425%'),
        }}>
          <View style={{justifyContent:'center',marginStart:moderateScale(10)}}>
          <IOSIcons name="search-outline" size={wp('5.5%')} color={colors.openGreen}/>

          </View>
      <TextInput style={{top:verticalScale(0),color:'black',width: wp('65%'),height:hp('4.425%')}}
      onChangeText={text => setSearchText(text)}
      placeholder='Ara...'
      textAlign='left'
      placeholderTextColor={'gray'}
      value={searchQuery}>

      </TextInput>
            {/**<Input
          isSearchBar={true}
          onChangeText={text => setSearchQuery(text)}
          icon={SearchIcon}
          iconStyle={{width:moderateScale(20),height:verticalScale(20),marginStart: moderateScale(0),marginEnd: moderateScale(5)}}
          placeholder='Ara...'
          style={{alignItems:'center',justifyContent:'center',height: hp('4.15%'),color:'black',marginStart:moderateScale(0)}}
          placeholderTextColor={'gray'}
          value={searchQuery}
        /> */}
          

      </View>
      <View style={{borderWidth:0.5,
      borderColor:'#D0D5DD',
      borderRadius:moderateScale(14),
      width:wp('12%'),
      justifyContent:'center',
      alignItems:'center',
      marginStart:moderateScale(10)}}>
        <IOSIcons name = "notifications" size={wp('5.5%')} color={colors.openGreen} />
      </View>
    </View>
      
      {searchQuery?.length > 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: moderateScale(20),
            marginTop:moderateScale(-15),
          }}>
          <View
            style={{
              width: moderateScale(80),
              borderRadius: moderateScale(25),
              height: verticalScale(35),
              borderWidth: moderateScale(1),
              borderColor: 'rgba(102, 174, 123, 1)',
              justifyContent: 'space-between',
              paddingLeft: moderateScale(15),
              paddingRight: moderateScale(10),
              alignItems: 'center',
              flexDirection: 'row',
              bottom: moderateScale(12),
            }}>
            <Text style={{ color: 'rgba(51, 51, 51, 1)' }}>Sırala</Text>
            <View
              style={{
                gap: moderateScale(10),
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
              bottom: moderateScale(12),
            }}>
            <Text style={{ color: 'rgba(51, 51, 51, 1)' }}>Filtre</Text>
            <View
              style={{
                gap: moderateScale(10),
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
          marginTop: moderateScale(0),
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

      <View style={{ marginTop: moderateScale(0)}}>
        <View style={{ marginBottom: verticalScale(5),marginTop:verticalScale(-5) }}>
          <HeadingText title="Haftanın Yıldızları" />
        </View>

        <CardSwiper data={filteredHomeItems} />

        <View style={{ marginBottom: verticalScale(5), marginTop: moderateScale(20) }}>
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

        <View style={{ marginTop: verticalScale(25), marginBottom: moderateScale(5) }}>
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

        <View style={{ marginTop: verticalScale(25), marginBottom: verticalScale(5) }}>
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
          title="Bağış Yapmak İster Misiniz ?"
          button={{
            variant: 'light',
            rounded: true,
          }}
          buttonTitle="Bağış Yap"
        />
      </View>
      <View style={{justifyContent:'flex-start',
        alignItems:'center',
         height:hp('23.5%'),
         borderWidth:1,
         borderColor:'#D0D5DD',
         marginHorizontal: verticalScale(20),
         marginTop: verticalScale(15),
         borderRadius: moderateScale(12),}}>
        <Text style={{color:'black',fontSize:moderateScale(22),width:wp('60%'),textAlign:'center',marginTop:verticalScale(15)}}>
          Supafo AI çok yakında sizlerle olacak.
        </Text>
        <Image source={DonateIcon}/>
      </View>

      {items && items.length !== 0 ? (
        <View>
          <View style={{ marginTop: moderateScale(17.5), marginBottom: moderateScale(-2.5)}}>
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
    justifyContent:'flex-start',
    marginBottom: verticalScale(5),
    width: wp('60%'),
    alignItems:'center',
    marginStart: moderateScale(70),
    marginTop: moderateScale(5),
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
    fontSize: moderateScale(13),
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
  thumbStyle: {
    borderWidth:moderateScale(1),
    height:verticalScale(22),
    width: scale(23),
    borderRadius:999,
    borderColor:'rgba(115, 115, 115, 0.2)',
    shadowColor:'#000000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.5, 
    shadowRadius: 1, 
    elevation: 7.5, 
  }
});
