import { RootState } from 'store';
import { EmployeeWithProduct, ProductWithEmployee } from 'types';

export const selectEmployeeProduct = (
  state: RootState
): EmployeeWithProduct[] => {
  const employees = state.staff;
  return Object.values(employees).map((employee) => ({
    ...employee,
    product: employee.productId
      ? state.products[employee.productId]
      : undefined,
  }));
};

export const selectProductWithEmployees = (
  state: RootState
): ProductWithEmployee[] => {
  const { products, staff } = state;
  return Object.values(products).map((product) => ({
    ...product,
    employees: Object.values(staff).filter(
      (employee) => employee.productId === product.id
    ),
  }));
};
