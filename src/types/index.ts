import { Dayjs } from 'dayjs';
import { AvatarKey } from 'utils/avatar';
import { Avatar } from 'antd';

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
  gender: Gender;
  background: Role;
  avatar: AvatarKey;
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
  avatar: AvatarKey;
  gender: Gender;
}

export enum Gender {
  'Man' = 'Man',
  'Woman' = 'Woman',
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
