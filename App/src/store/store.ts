import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import {name as appName} from '../../app.json';
import userSlice from './slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isCartConfirmed from './slices/isCartConfirmed';
import orderDetail from './slices/orderDetail';
import setUserId from './slices/setUserId';

const persistConfig = {
  key: appName,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userSlice,
  confirmedCart: isCartConfirmed,
  detailOfOrder: orderDetail,
  setUserId: setUserId,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export {store, persistor, rootReducer};
