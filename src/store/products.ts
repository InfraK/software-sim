import { selectProductWithEmployees } from './../selectors/index';
import { RootState } from './index';
import { Product, BasicProduct, Role, Employee, Concept } from 'types';
import {
  createSlice,
  PayloadAction,
  ThunkDispatch,
  AnyAction,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { createRecord } from './finances';
import { incrementDate } from './company';

const initialState: ProductState = {};

interface ProductState {
  [key: string]: Product;
}

interface ProductProgress {
  id: string;
  version: string;
  marketing: number;
  quality: number;
  traffic: number;
  design: number;
  code: number;
}

export const updateGame = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
) => {
  const products = selectProductWithEmployees(getState());
  const progress: ProductProgress[] = products.map((product) => {
    const { developers, desginers, qas, marketers } = getAllEmployeesByRoles(
      product.employees
    );

    const codeProgress = developers.reduce(
      (p, e) => p + e.expertise.developer / 100,
      0
    );

    const designProgress = desginers.reduce(
      (p, e) => p + e.expertise.designer / 100,
      0
    );

    const qaProgress = qas.reduce((p, e) => p + e.expertise.qa / 100, 0);

    const marketingProgress = marketers.reduce(
      (p, e) => p + e.expertise.marketing / 100,
      0
    );

    const newTraffic =
      1 + product.marketing * product.code * product.design + product.quality;

    return {
      code: codeProgress,
      design: designProgress,
      id: product.id,
      marketing: marketingProgress,
      quality: qaProgress,
      traffic: newTraffic,
      version: product.version,
    };
  });

  const salaries = -Object.values(getState().staff).reduce(
    (acc, employee) => acc + employee.salary,
    0
  );

  const revenue = products.reduce(
    (acc, product) => acc + product.traffic * 0.2,
    0
  );
  const date = getState().company.date;

  if (revenue) {
    dispatch(createRecord({ amount: revenue, concept: Concept.Revenue, date }));
  }

  if (salaries) {
    dispatch(
      createRecord({ amount: salaries, concept: Concept.Salaries, date })
    );
  }

  dispatch(incrementDate());
  dispatch(addProgress(progress));
};

// const incrementVersion = (version: string, newFeatures: number) => {
//   let features = newFeatures;
//   const [major, minor, patch] = version.split('.').map((s) => Number(s));
//   if
//   let newPatch = patch + newFeatures;
//   if (newPatch > 100) {
//     newMajor++;
//   }
//   let newMajor = major;
//   let newMinor = minor;
// };

const getEmployeesByRole = (role: Role, employees: Employee[]): Employee[] =>
  employees.filter((employee) => employee.role === role);

const getAllEmployeesByRoles = (employees: Employee[]) => {
  return {
    developers: getEmployeesByRole(Role.Developer, employees),
    desginers: getEmployeesByRole(Role.Designer, employees),
    qas: getEmployeesByRole(Role.QA, employees),
    marketers: getEmployeesByRole(Role.Marketer, employees),
  };
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProduct(state, action: PayloadAction<BasicProduct>) {
      const product = buildProduct(action.payload);
      state[product.id] = product;
    },
    addProgress(state, action: PayloadAction<ProductProgress[]>) {
      action.payload.forEach((progress) => {
        console.log(progress);
        state[progress.id].version = progress.version;
        state[progress.id].marketing += progress.marketing;
        state[progress.id].code += progress.code;
        state[progress.id].design += progress.design;
        state[progress.id].quality += progress.quality;
        state[progress.id].traffic += progress.traffic;
      });
    },
  },
});

export const { createProduct, addProgress } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

const buildProduct = (basic: BasicProduct): Product => {
  return { ...emptyProduct, ...basic, id: uuid() };
};

const emptyProduct: Product = {
  name: '',
  id: '',
  code: 0,
  design: 0,
  marketing: 0,
  quality: 0,
  traffic: 0,
  version: '0.0.1',
};
