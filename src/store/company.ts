import { Company, BasicCompany } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Company = {
  employees: [],
  money: 50000,
  name: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    createCompany(state, action: PayloadAction<BasicCompany>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { createCompany } = companySlice.actions;
export const companyReducer = companySlice.reducer;
