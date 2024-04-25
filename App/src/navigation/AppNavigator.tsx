import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import routes from './routes';
import HomeTabNavigator from './HomeTabNavigator';
import CartTabScreen from '../screens/CartTabScreen/features/Cart';
import {StyleSheet} from 'react-native';
import OnlinePaymentScreen from '../screens/CartTabScreen/features/OnlinePayment';

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
      <Stack.Screen name={'CartTabScreen'} component={CartTabScreen} />
      <Stack.Screen
        name={'OnlinePaymentScreen'}
        component={OnlinePaymentScreen}
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
    fontSize: 23,
  },
});
