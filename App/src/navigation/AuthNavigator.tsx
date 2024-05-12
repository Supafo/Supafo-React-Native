import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import routes from './routes';
import AuthScreen from '../screens/AuthScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ForgotPasswordByEmailScreen from '../screens/ForgotPasswordByEmailScreen';
import ForgotPasswordBySmsScreen from '../screens/ForgotPasswordBySmsScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import PasswordUpdatedScreen from '../screens/PasswordUpdatedScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.SPLASH_SCREEN}
      screenOptions={() => ({
        headerMode: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        presentation: 'card',
      })}>
      <Stack.Screen name={routes.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen
        name={routes.ONBOARDING_SCREEN}
        component={OnboardingScreen}
      />
      <Stack.Screen name={routes.AUTH_SCREEN} component={AuthScreen} />
      <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={routes.SIGNUP_SCREEN} component={SignupScreen} />
      <Stack.Screen
        name={routes.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={routes.FORGOT_PASSWORD_BY_EMAIL_SCREEN}
        component={ForgotPasswordByEmailScreen}
      />
      <Stack.Screen
        name={routes.FORGOT_PASSWORD_BY_SMS_SCREEN}
        component={ForgotPasswordBySmsScreen}
      />
      <Stack.Screen
        name={routes.SET_PASSWORD_SCREEN}
        component={SetPasswordScreen}
      />
      <Stack.Screen
        name={routes.PASSWORD_UPDATED}
        component={PasswordUpdatedScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
