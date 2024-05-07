import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import routes from './routes';
import HomeTabNavigator from './HomeTabNavigator';
<<<<<<< HEAD
import CartTabScreen from '../screens/CartTabScreen/features/Cart';
import {StyleSheet} from 'react-native';
import OnlinePaymentScreen from '../screens/CartTabScreen/features/OnlinePayment';
import OrderDetailScreen from '../screens/CartTabScreen/features/OrderDetails';
import HomeTabScreen from '../screens/HomeTabScreen';
=======
import OnboardingScreen from '../screens/OnboardingScreen';
import AccountTabNavigator from './AccountTabNavigator';
import {OrderHistory} from '../screens/AccountTabScreen/OrderHistory';
import {AdressInfo} from '../screens/AccountTabScreen/AdressInfo';
import {AccountInfo} from '../screens/AccountTabScreen/AccountInfo';
import {CustomerServices} from '../screens/AccountTabScreen/CustomerServices';
import {ShopLogin} from '../screens/AccountTabScreen/ShopLogin';
import {Help} from '../screens/AccountTabScreen/Help';
import {AddAddress} from '../screens/AccountTabScreen/AddAddress';
>>>>>>> account-tab

const Stack = createStackNavigator();

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
<<<<<<< HEAD
      <Stack.Screen name={'CartTabScreen'} component={CartTabScreen} />
      <Stack.Screen
        name={'OnlinePaymentScreen'}
        component={OnlinePaymentScreen}
      />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="HomeScreen" component={HomeTabScreen} />
=======
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
>>>>>>> account-tab
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
    fontSize: 23,
  },
});
