import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import routes from './routes';
import {OrderHistory} from '../screens/AccountTabScreen/OrderHistory'; // Import OrderHistory screen

// Create a stack navigator
const Stack = createStackNavigator();

const AccountTabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={routes.ACCOUNT_TAB_SCREEN}>
      <Stack.Screen
        name={routes.ORDER_HISTORY_SCREEN}
        component={OrderHistory}
      />
    </Stack.Navigator>
  );
};

export default AccountTabNavigator;
