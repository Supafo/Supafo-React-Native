import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../theme/colors';
import HomeTabScreen from '../screens/HomeTabScreen';
import FavouriteTabScreen from '../screens/FavouriteTabScreen';
import DiscoverTabScreen from '../screens/DiscoverTabScreen';
import CartTabScreen from '../screens/CartTabScreen/features/Cart';
import AccountTabScreen from '../screens/AccountTabScreen';
import {Image} from 'react-native';
import {
  AccountTabIcon,
  CartTabIcon,
  DiscoverTabIcon,
  FavouriteTabIcon,
  HomeTabIcon,
} from '../assets/images';
import OrderDetailScreen from '../screens/CartTabScreen/features/OrderDetails';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = ({navigation}) => {
  const confirmValue = useSelector(
    (state: RootState) => state.confirmedCart.isConfirmed,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabBarActiveTint,
        tabBarInactiveTintColor: colors.tabBarInactiveTint,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
        },
      }}>
      <Tab.Screen
        name={'Anasayfa'}
        component={HomeTabScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={HomeTabIcon}
              resizeMode="contain"
              className="w-[18px] h-[18px]"
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Favorilerim'}
        component={FavouriteTabScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={FavouriteTabIcon}
              resizeMode="contain"
              className="w-[18px] h-[18px]"
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Keşfet'}
        component={DiscoverTabScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={DiscoverTabIcon}
              resizeMode="contain"
              className="w-[18px] h-[18px]"
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Sepetim'}
        component={confirmValue ? OrderDetailScreen : CartTabScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={CartTabIcon}
              resizeMode="contain"
              className="w-[18px] h-[18px]"
            />
          ),
          tabBarStyle: {display: confirmValue ? 'flex' : 'none'},
        }}
      />
      <Tab.Screen
        name={'Hesabım'}
        component={AccountTabScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={AccountTabIcon}
              resizeMode="contain"
              className="w-[18px] h-[18px]"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
