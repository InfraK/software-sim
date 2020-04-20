import { Expertise } from './../types/index';
import { CEO, BasicCEO, CEOBackgrounds } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CEO = {
  background: 'Developer',
  expertise: {
    designer: 0,
    developer: 0,
    marketing: 0,
    qa: 0,
  },
  firstName: '',
  lastName: '',
};

const ceoSlice = createSlice({
  name: 'ceo',
  initialState,
  reducers: {
    createCEO(state, action: PayloadAction<BasicCEO>) {
      const ceo = buildCeo(action.payload);
      return ceo;
    },
  },
});

export const { createCEO } = ceoSlice.actions;
export const ceoReducer = ceoSlice.reducer;

const buildCeo = (base: BasicCEO): CEO => {
  return {
    ...base,
    expertise: baseExpertise[base.background],
  };
};

const base10: Expertise = {
  designer: 10,
  developer: 10,
  marketing: 10,
  qa: 10,
};

const baseExpertise: { [key in CEOBackgrounds]: Expertise } = {
  Designer: {
    ...base10,
    designer: 50,
  },
  Developer: {
    ...base10,
    developer: 50,
  },
  Marketer: {
    ...base10,
    marketing: 50,
  },
  QA: {
    ...base10,
    qa: 50,
  },
};
