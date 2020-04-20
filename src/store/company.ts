import { Company, BasicCompany } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Company = {
  employees: [],
  money: 50000,
  name: '',
  products: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    createCompany(state, action: PayloadAction<BasicCompany>) {
      state = { ...state, ...action.payload };
    },
  },
});

export const { createCompany } = companySlice.actions;
export const companyReducer = companySlice.reducer;
