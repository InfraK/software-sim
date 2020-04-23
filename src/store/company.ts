import dayjs from 'dayjs';
import { GameState, BasicCompany } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: GameState = {
  name: '',
  date: dayjs('2010-01-01'),
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
  },
});

export const { createCompany, incrementDate } = companySlice.actions;
export const companyReducer = companySlice.reducer;
