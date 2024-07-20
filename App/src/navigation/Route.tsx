import React from 'react';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import {getUserLoggedIn} from '../store/slices/userSlice';
import AppNavigator from './AppNavigator';
import {RootState} from '../store/store';

function Route() {
  const token = useSelector((state: RootState) => state.user.token);
  console.log('isUserLoggedIn: ', token);
  return token === null ? <AuthNavigator /> : <AppNavigator />;
}

export default Route;
