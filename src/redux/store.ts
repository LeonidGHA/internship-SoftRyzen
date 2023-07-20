import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/auth-slice';
import { baseApi } from 'services/baseApi';
import { testingPageReducer } from './testing/testingPageSlice';
import { formDataReducer } from './formDataCollector/formDataSlice';
import { progressStatusReducer } from './progressStatus/progressStatusSlice';

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'isLoggedIn', 'forgotPassword'],
};

const formPersistConfig = {
  key: 'formCollector',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const formPersistedReducer = persistReducer(formPersistConfig, formDataReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    testingPage: testingPageReducer,
    formCollector: formPersistedReducer,
    progressStatus: progressStatusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
