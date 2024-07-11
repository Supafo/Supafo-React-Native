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
  BagIconInactive,
} from '../assets/images';
import OrderDetailScreen from '../screens/CartTabScreen/features/OrderDetails';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {moderateScale} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = ({navigation}) => {
  const confirmValue = useSelector(
    (state: RootState) => state.confirmedCart.isConfirmed,
  );
  const detail = useSelector(
    (state: RootState) => state.detailOfOrder.detailOfOrder,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabBarActiveTint,
        tabBarInactiveTintColor: colors.tabBarInactiveTint,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          padding: 7,
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
          padding: 3,
          fontWeight: '300',
        },
      }}>
      <Tab.Screen
        name={'Anasayfa'}
        component={HomeTabScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={HomeTabIcon}
              resizeMode="contain"
              className="w-[22px] h-[22px]"
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Favorilerim'}
        component={FavouriteTabScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={FavouriteTabIcon}
              resizeMode="contain"
              className="w-[22px] h-[22px]"
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Keşfet'}
        component={DiscoverTabScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={DiscoverTabIcon}
              resizeMode="contain"
              className="w-[22px] h-[22px]"
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Sepet'}
        component={
          confirmValue && detail !== 'null' ? OrderDetailScreen : CartTabScreen
        }
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={CartTabIcon}
              resizeMode="contain"
              className="w-[22px] h-[22px]"
            />
          ),
          tabBarStyle: {display: confirmValue ? 'flex' : 'none'},
        }}
      />
      <Tab.Screen
        name={'Profil'}
        component={AccountTabScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={AccountTabIcon}
              resizeMode="contain"
              className="w-[22px] h-[22px]"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
