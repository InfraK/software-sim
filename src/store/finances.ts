import { FinanceRecord, Concept, RecordPayload } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialDate } from 'constants/config';

const initialState: FinanceRecord[] = [
  {
    date: initialDate,
    amount: 50000,
    money: 50000,
    concept: Concept.Revenue,
  },
];

const financeSlice = createSlice({
  name: 'fianance',
  initialState,
  reducers: {
    createRecord(state, action: PayloadAction<RecordPayload>) {
      const [{ money }] = state.slice(-1);
      const record: FinanceRecord = {
        ...action.payload,
        money: money + action.payload.amount,
      };
      state.push(record);
    },
  },
});

export const { createRecord } = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
