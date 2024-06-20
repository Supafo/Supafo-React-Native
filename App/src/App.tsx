import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Route from './navigation/Route';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RootState, persistor, store} from './store/store';
import auth from '@react-native-firebase/auth';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
