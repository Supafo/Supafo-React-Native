import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import routes from './routes';
import SplashScreen from '../screens/SplashScreen';
import HomeTabNavigator from './HomeTabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import AccountTabNavigator from './AccountTabNavigator';
import {OrderHistory} from '../screens/AccountTabScreen/OrderHistory';
import {AdressInfo} from '../screens/AccountTabScreen/AdressInfo';
import {AccountInfo} from '../screens/AccountTabScreen/AccountInfo';
import {CustomerServices} from '../screens/AccountTabScreen/CustomerServices';
import {ShopLogin} from '../screens/AccountTabScreen/ShopLogin';
import {Help} from '../screens/AccountTabScreen/Help';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={routes.HOME_TAB_NAVIGATOR}
        component={HomeTabNavigator}
      />
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
