import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import routes from './routes';
import {OrderHistory} from '../screens/AccountTabScreen/OrderHistory';
import {AdressInfo} from '../screens/AccountTabScreen/AdressInfo';
import {AccountInfo} from '../screens/AccountTabScreen/AccountInfo';
import {CustomerServices} from '../screens/AccountTabScreen/CustomerServices';
import {ShopLogin} from '../screens/AccountTabScreen/ShopLogin';
import {Help} from '../screens/AccountTabScreen/Help';
import {AddAddress} from '../screens/AccountTabScreen/AddAddress';

const Stack = createStackNavigator();

const AccountTabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={routes.ACCOUNT_TAB_SCREEN}>
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
    </Stack.Navigator>
  );
};

export default AccountTabNavigator;
