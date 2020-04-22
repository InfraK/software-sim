import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { companyReducer } from './company';
import { ceoReducer } from './ceo';
import { productsReducer } from './products';
import { staffReducer } from './staff';

const rootReducer = combineReducers({
  company: companyReducer,
  ceo: ceoReducer,
  products: productsReducer,
  staff: staffReducer,
});

export const persistedReducer = persistReducer(
  { key: 'root', storage },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
