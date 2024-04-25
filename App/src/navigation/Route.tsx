import React from 'react';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import {getUserLoggedIn} from '../store/slices/userSlice';
import AppNavigator from './AppNavigator';

function Route() {
  const isUserLoggedIn = useSelector(getUserLoggedIn);
  return isUserLoggedIn ? <AppNavigator /> : <AuthNavigator />;
}

export default Route;
