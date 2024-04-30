import { configureStore } from '@reduxjs/toolkit';
import { contactSlice } from './contactSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactSlice.reducer);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
  },
  middleware: () => [thunk],
});

export const persistor = persistStore(store);
