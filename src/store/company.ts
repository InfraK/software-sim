import dayjs from 'dayjs';
import { GameState, BasicCompany } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialDate } from 'constants/config';

const initialState: GameState = {
  name: '',
  date: initialDate,
  confirmed: false,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    createCompany(state, action: PayloadAction<BasicCompany>) {
      return { ...state, ...action.payload };
    },
    incrementDate(state) {
      state.date = dayjs(state.date).add(1, 'day');
    },
    confirmCreate(state) {
      state.confirmed = true;
    },
  },
});

export const {
  createCompany,
  incrementDate,
  confirmCreate,
} = companySlice.actions;
export const companyReducer = companySlice.reducer;
