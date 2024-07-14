import React from 'react';
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
import {moderateScale} from 'react-native-size-matters';
import HomeSvg from '../assets/images/bottombaricons/Home-pasif-svg.svg';
import HomeSvgActive from '../assets/images/bottombaricons/HomeActive.svg';
import FavsSvg from '../assets/images/bottombaricons/HeartSvg.svg';
import FavsActiveSvg from '../assets/images/bottombaricons/heartActive.svg';
import DiscoverSvg from '../assets/images/bottombaricons/DiscoverSvg.svg';
import DiscoverActiveSvg from '../assets/images/bottombaricons/DiscoverActive.svg';
import BasketSvg from '../assets/images/bottombaricons/sepet-pasif-svg.svg';
import BasketActiveSvg from '../assets/images/bottombaricons/home-aktif-svg.svg';
import ProfileSvg from '../assets/images/bottombaricons/Profil-pasif-svg.svg';
import ProfileActiveSvg from '../assets/images/bottombaricons/Profil-aktif-svg.svg';

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
          tabBarIcon: ({focused}) => {
            return focused ? <HomeSvgActive /> : <HomeSvg />;
          },
          //(
          //   <Image
          //     source={focused ? HomeTabIcon : HomeSvg}
          //     resizeMode="contain"
          //     className="w-[22px] h-[22px]"
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name={'Favorilerim'}
        component={FavouriteTabScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <FavsActiveSvg /> : <FavsSvg />;
          },
        }}
      />
      <Tab.Screen
        name={'Keşfet'}
        component={DiscoverTabScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <DiscoverActiveSvg /> : <DiscoverSvg />;
          },
        }}
      />
      <Tab.Screen
        name={'Sepet'}
        component={
          confirmValue && detail !== 'null' ? OrderDetailScreen : CartTabScreen
        }
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <BasketActiveSvg /> : <BasketSvg />;
          },
          tabBarStyle: {display: confirmValue ? 'flex' : 'none'},
        }}
      />
      <Tab.Screen
        name={'Profil'}
        component={AccountTabScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <ProfileActiveSvg /> : <ProfileSvg />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
