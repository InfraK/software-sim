import { Employee, BasicPerson, Role, BasicCEO, Expertise } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState: StaffState = {};

interface StaffState {
  [key: string]: Employee;
}

interface AssignPayload {
  employees: Employee[];
  productId: string;
}
interface ChangeRolePayload {
  employees: Employee[];
  role: Role | undefined;
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
        state[employee.id].productId =
          productId === 'Unassign' ? undefined : productId;
      });
    },
    changeRole(state, action: PayloadAction<ChangeRolePayload>) {
      const { employees, role } = action.payload;
      employees.forEach((employee) => {
        state[employee.id].role = role;
      });
    },
    createCEO(state, action: PayloadAction<BasicCEO>) {
      const ceo = buildCeo(action.payload);
      state[ceo.id] = ceo;
    },
  },
});

export const { hire, fire, assign, changeRole, createCEO } = staffSlice.actions;
export const staffReducer = staffSlice.reducer;

const buildEmployee = (basic: BasicPerson): Employee => {
  return { ...emptyEmployee(), ...basic };
};

const emptyEmployee = (): Omit<Employee, 'expertise' | 'salary' | 'id'> => ({
  hiredOn: dayjs(),
  firstName: '',
  lastName: '',
});

const buildCeo = (base: BasicCEO): Employee => {
  return {
    ...base,
    expertise: baseExpertise[base.background],
    id: 'CEO',
    hiredOn: dayjs(),
    salary: 0,
  };
};

const base10: Expertise = {
  designer: 10,
  developer: 10,
  marketing: 10,
  qa: 10,
};

const baseExpertise: { [key in Role]: Expertise } = {
  [Role.Designer]: {
    ...base10,
    designer: 50,
  },
  [Role.Developer]: {
    ...base10,
    developer: 50,
  },
  [Role.Marketer]: {
    ...base10,
    marketing: 50,
  },
  [Role.QA]: {
    ...base10,
    qa: 50,
  },
};
