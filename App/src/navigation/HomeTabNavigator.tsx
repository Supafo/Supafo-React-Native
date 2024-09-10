import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../theme/colors';
import HomeTabScreen from '../screens/HomeTabScreen';
import FavouriteTabScreen from '../screens/FavouriteTabScreen';
import DiscoverTabScreen from '../screens/DiscoverTabScreen';
import CartTabScreen from '../screens/CartTabScreen/features/Cart';
import AccountTabScreen from '../screens/AccountTabScreen';
import OrderDetailScreen from '../screens/CartTabScreen/features/OrderDetails';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import HomeSvg from '../assets/images/bottombaricons/Home-pasif-svg.svg';
import HomeSvgActive from '../assets/images/bottombaricons/HomeActive.svg';
import FavsSvg from '../assets/images/bottombaricons/HeartSvg.svg';
import FavsActiveSvg from '../assets/images/bottombaricons/heartActive.svg';
import DiscoverSvg from '../assets/images/bottombaricons/DiscoverSvg.svg';
import DiscoverActiveSvg from '../assets/images/bottombaricons/DiscoverActive.svg';
import BasketSvg from '../assets/images/bottombaricons/sepet-pasif-svg.svg';
import BasketActiveSvg from '../assets/images/bottombaricons/sepet-aktif-svg.svg';
import ProfileSvg from '../assets/images/bottombaricons/Profil-pasif-svg.svg';
import ProfileActiveSvg from '../assets/images/bottombaricons/Profil-aktif-svg.svg';
import {Text, View} from 'react-native';
import fireStore from '@react-native-firebase/firestore';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = ({navigation}) => {
  const confirmValue = useSelector(
    (state: RootState) => state.confirmedCart.isConfirmed,
  );

  const [status, setStatus] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const id = useSelector((state: RootState) => state.setUserId.id);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const userId = id;
        if (!userId) {
          console.warn('User ID is not set');
          return;
        }

        const ordersCollection = fireStore()
          .collection(userId)
          .doc('orders')
          .collection('ordersList');
        const ordersSnapshot = await ordersCollection.get();

        if (ordersSnapshot.empty) {
          console.warn('No orders found');
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
  }, [id, status]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabBarActiveTint,
        tabBarInactiveTintColor: colors.tabBarInactiveTint,
        tabBarStyle: {
          backgroundColor: 'white',
          alignItems: 'center',
          height: verticalScale(50),
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
          fontWeight: '300',
        },
      }}>
      <Tab.Screen
        name={'Anasayfa'}
        component={HomeTabScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return focused ? <HomeSvgActive /> : <HomeSvg />;
            
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  color: focused ? '#66AE7B' : '#333333',
                  fontWeight: focused ? '500' : '300',
                  fontSize: moderateScale(12),
                  marginBottom: verticalScale(7),
                }}>
                Anasayfa
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name={'Favorilerim'}
        component={FavouriteTabScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return focused ? <FavsActiveSvg /> : <FavsSvg />;
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  color: focused ? '#66AE7B' : '#333333',
                  fontWeight: focused ? '500' : '300',
                  fontSize: moderateScale(12),
                  marginBottom: verticalScale(5),
                }}>
                Favorilerim
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name={'Keşfet'}
        component={DiscoverTabScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return focused ? <DiscoverActiveSvg /> : <DiscoverSvg />;
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  color: focused ? '#66AE7B' : '#333333',
                  fontWeight: focused ? '500' : '300',
                  fontSize: moderateScale(12),
                  marginBottom: verticalScale(7),
                }}>
                Keşfet
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name={'Sepet'}
        component={
          confirmValue && status !== 'null' ? OrderDetailScreen : CartTabScreen
        }
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return focused ? <BasketActiveSvg /> : <BasketSvg />;
          },
          tabBarStyle: {display: confirmValue ? 'flex' : 'none'},
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  color: focused ? '#66AE7B' : '#333333',
                  fontWeight: focused ? '500' : '300',
                  fontSize: moderateScale(12),
                  marginBottom: verticalScale(7),
                }}>
                Sepet
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name={'Profil'}
        component={AccountTabScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return focused ? <ProfileActiveSvg /> : <ProfileSvg />;
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  color: focused ? '#66AE7B' : '#333333',
                  fontWeight: focused ? '500' : '300',
                  fontSize: moderateScale(12),
                  marginBottom: verticalScale(7),
                }}>
                Profil
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
