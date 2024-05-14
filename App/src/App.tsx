import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Route from './navigation/Route';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store/store';

import firestore from '@react-native-firebase/firestore';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  const [item, setItem] = useState();

  const getData = async () => {
    try {
      console.log('girdi');

      const userCollection = await firestore().collection('supafo').get();
      // console.log(userCollection.docs[0].data());
      setItem(userCollection.docs[0].data());

      console.log('categories: ', userCollection.docs[0].data());

      //const categoryDataArray = categories.docs.map(doc => doc.data());
      //console.log("Category Data Array: ", JSON.stringify(categoryDataArray, null, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    //getData();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#F5F5FA'} barStyle={'dark-content'} />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
