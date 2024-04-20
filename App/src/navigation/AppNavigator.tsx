import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import routes from './routes';
import SplashScreen from '../screens/SplashScreen';
import HomeTabNavigator from './HomeTabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';

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
    </Stack.Navigator>
  );
};

export default AppNavigator;
