import { Product, BasicProduct } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState: ProductState = {};

interface ProductState {
  [key: string]: Product;
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProduct(state, action: PayloadAction<BasicProduct>) {
      const product = buildProduct(action.payload);
      state[product.id] = product;
    },
  },
});

export const { createProduct } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

const buildProduct = (basic: BasicProduct): Product => {
  return { ...emptyProduct, ...basic, id: uuid() };
};

const emptyProduct: Product = {
  name: '',
  id: '',
  features: 0,
  marketing: 0,
  quality: 0,
  traffic: 0,
  version: '0.0.1',
};
