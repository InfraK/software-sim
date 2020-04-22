import { Employee, BasicPerson } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: StaffState = {};

interface StaffState {
  [key: string]: Employee;
}

interface AssignPayload {
  employees: Employee[];
  productId: string;
}

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    hire(state, action: PayloadAction<BasicPerson[]>) {
      const employees = action.payload.map((person) => buildEmployee(person));
      employees.forEach((employee) => {
        state[employee.id] = employee;
      });
    },
    fire(state, action: PayloadAction<Employee[]>) {
      action.payload.forEach((employee) => {
        delete state[employee.id];
      });
    },
    assign(state, action: PayloadAction<AssignPayload>) {
      const { employees, productId } = action.payload;
      employees.forEach((employee) => {
        state[employee.id].productId = productId;
      });
    },
  },
});

export const { hire, fire, assign } = staffSlice.actions;
export const staffReducer = staffSlice.reducer;

const buildEmployee = (basic: BasicPerson): Employee => {
  return { ...emptyEmployee(), ...basic };
};

const emptyEmployee = (): Omit<Employee, 'expertise' | 'salary' | 'id'> => ({
  hiredOn: new Date(),
  firstName: '',
  lastName: '',
});
