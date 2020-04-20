export interface BasicProduct {
  name: string;
}

export interface Product extends BasicProduct {
  id: string;
  version: string;
  features: number;
  marketing: number;
  quality: number;
  traffic: number;
}

export interface BasicCEO {
  firstName: string;
  lastName: string;
  background: CEOBackgrounds;
}

export interface CEO extends BasicCEO {
  expertise: Expertise;
}

export interface BasicCompany {
  name: string;
}

export interface Company extends BasicCompany {
  money: number;
  employees: Employee[];
}

export type CEOBackgrounds = Roles;

export type Roles = 'Developer' | 'Designer' | 'Marketer' | 'QA';

export interface BasicPerson {
  id: string;
  firstName: string;
  lastName: string;
  expertise: Expertise;
}

export interface Expertise {
  developer: number;
  designer: number;
  marketing: number;
  qa: number;
}

export interface Employee extends BasicPerson {
  productId?: Product['id'];
  hiredOn: Date;
  salary: number;
  role: Roles;
}
