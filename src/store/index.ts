import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { companyReducer } from './company';
import { ceoReducer } from './ceo';
import { productsReducer } from './products';

const rootReducer = combineReducers({
  company: companyReducer,
  ceo: ceoReducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
