import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import routes, {RootStackParamList} from './routes';
import HomeTabNavigator from './HomeTabNavigator';
import CartTabScreen from '../screens/CartTabScreen/features/Cart';
import {StyleSheet} from 'react-native';
import OnlinePaymentScreen from '../screens/CartTabScreen/features/OnlinePayment';
import OrderDetailScreen from '../screens/CartTabScreen/features/OrderDetails';
import HomeTabScreen from '../screens/HomeTabScreen';
import {OrderHistory} from '../screens/AccountTabScreen/OrderHistory';
import {AdressInfo} from '../screens/AccountTabScreen/AdressInfo';
import {AccountInfo} from '../screens/AccountTabScreen/AccountInfo';
import {ShopLogin} from '../screens/AccountTabScreen/ShopLogin';
import {Help} from '../screens/AccountTabScreen/Help';
import RestaurantDetail from '../screens/RestaurantDetails/RestaurantDetail';
import MyOrders from '../screens/AccountTabScreen/sub-screens/MyOrders';
import OrderHelpDetails from '../screens/AccountTabScreen/sub-screens/OrderHelpDetails';
import ContactUs from '../screens/AccountTabScreen/sub-screens/ContactUs';
import SSS from '../screens/AccountTabScreen/sub-screens/SSS';
import JoinSupafo from '../screens/AccountTabScreen/sub-screens/JoinSupafo';
import Rating from '../screens/CartTabScreen/features/Ratings/Rating';
import RateSuccess from '../screens/CartTabScreen/features/Ratings/RateSuccess';
import RateAndComments from '../screens/CartTabScreen/features/Ratings/RateAndComments';
import AddAddress from '../screens/AccountTabScreen/AddAddress';
import CustomerServices from '../screens/AccountTabScreen/CustomerServices';
import { moderateScale } from 'react-native-size-matters';
import JoinSupafoForm from '../screens/AccountTabScreen/sub-screens/JoinSupafoForm';
import SuccessScreen from '../screens/AccountTabScreen/sub-screens/JoinSupafoForm/FormSections/SuccessScreen'

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen
        name={routes.HOME_TAB_NAVIGATOR}
        component={HomeTabNavigator}
      />
      <Stack.Screen name={'CartTabScreen'} component={CartTabScreen} />
      <Stack.Screen
        name={'OnlinePaymentScreen'}
        component={OnlinePaymentScreen}
      />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
      <Stack.Screen name="HomeScreen" component={HomeTabScreen} />
      <Stack.Screen
        name={routes.ORDER_HISTORY_SCREEN}
        component={OrderHistory}
      />
      <Stack.Screen name={routes.ADDRESS_INFO_SCREEN} component={AdressInfo} />
      <Stack.Screen name={routes.ACCOUNT_INFO_SCREEN} component={AccountInfo} />
      <Stack.Screen
        name={routes.CUSTOMER_SERVICES_SCREEN}
        component={CustomerServices}
      />
      <Stack.Screen name={routes.SHOP_LOGIN_SCREEN} component={ShopLogin} />
      <Stack.Screen name={routes.HELP_SCREEN} component={Help} />
      <Stack.Screen name={routes.ADD_ADDRESS} component={AddAddress} />
      <Stack.Screen name={routes.MY_ORDERS} component={MyOrders} />
      <Stack.Screen
        name={routes.ORDER_HELP_DETAIL}
        component={OrderHelpDetails}
      />
      <Stack.Screen name={routes.CONTACT_US} component={ContactUs} />
      <Stack.Screen name={routes.SSS} component={SSS} />
      <Stack.Screen name={routes.JOIN_SUPAFO} component={JoinSupafo} />
      <Stack.Screen name={routes.JOIN_SUPAFO_FORM} component={JoinSupafoForm} />
      <Stack.Screen name={routes.RATINGS} component={Rating} />
      <Stack.Screen name={routes.CONGRATS} component={RateSuccess} />
      <Stack.Screen name={routes.SUCCESS_SCREEN} component={SuccessScreen} />
      <Stack.Screen name={routes.HOME_TAB_SCREEN} component={HomeTabScreen} />
      <Stack.Screen
        name={routes.RATE_AND_COMMENTS}
        component={RateAndComments}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
    flex: 1,
    width: '100%',
  },
  bg: {
    backgroundColor: 'blue',
  },
  title: {
    fontSize: moderateScale(23),
  },
});
