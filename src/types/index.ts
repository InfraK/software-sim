import { Dayjs } from 'dayjs';

export interface BasicProduct {
  name: string;
}

export interface Product extends BasicProduct {
  id: string;
  version: string;
  design: number;
  code: number;
  marketing: number;
  quality: number;
  traffic: number;
}

export interface BasicCEO {
  firstName: string;
  lastName: string;
  background: Role;
}

export interface BasicCompany {
  name: string;
}

export interface GameState extends BasicCompany {
  date: Dayjs;
}

export enum Role {
  'Developer' = 'Developer',
  'Designer' = 'Designer',
  'Marketer' = 'Marketer',
  'QA' = 'QA',
}

export interface BasicPerson {
  id: string;
  firstName: string;
  lastName: string;
  expertise: Expertise;
  salary: number;
}

export interface Expertise {
  developer: number;
  designer: number;
  marketing: number;
  qa: number;
}

export interface Employee extends BasicPerson {
  productId?: Product['id'];
  hiredOn: Dayjs;
  salary: number;
  role?: Role;
}

export interface EmployeeWithProduct extends Employee {
  product?: Product;
}
export interface ProductWithEmployee extends Product {
  employees: Employee[];
}

export interface FinanceRecord {
  date: Dayjs;
  concept: Concept;
  amount: number;
  money: number;
}

export type RecordPayload = Omit<FinanceRecord, 'money'>;

export enum Concept {
  Salaries = 'Salaries',
  Revenue = 'Revenue',
}
