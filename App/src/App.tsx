import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Route from './navigation/Route';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
