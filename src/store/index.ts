import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { companyReducer } from './company';
import { productsReducer } from './products';
import { staffReducer } from './staff';
import { financeReducer } from './finances';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  company: companyReducer,
  products: productsReducer,
  staff: staffReducer,
  finance: financeReducer,
});

export const persistedReducer = persistReducer(
  { key: 'root', storage },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
