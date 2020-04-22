import { Expertise } from './../types/index';
import { firstNames } from 'constants/firstNames';
import { lastNames } from 'constants/lastNames';
import { BasicPerson } from 'types';
import { v4 as uuid } from 'uuid';

export const getRandomInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomItem = <T>(array: T[]): T =>
  array[getRandomInRange(0, array.length)];

export const getRandomFirstName = () => getRandomItem(firstNames);
export const getRandomLastName = () => getRandomItem(lastNames);

export const getRandomExpertise = (): Expertise => {
  return {
    designer: getRandomInRange(10, 80),
    developer: getRandomInRange(10, 80),
    marketing: getRandomInRange(10, 80),
    qa: getRandomInRange(10, 80),
  };
};

export const generateBasicPerson = (): BasicPerson => {
  const expertise = getRandomExpertise();
  return {
    firstName: getRandomFirstName(),
    lastName: getRandomLastName(),
    expertise,
    salary: calculateSalary(expertise),
    id: uuid(),
  };
};

const salaryPerPoint = 20;

export const calculateSalary = (expetise: Expertise): number => {
  return Object.values(expetise).reduce((p, n) => p + n, 0) * salaryPerPoint;
};

export const generatePersons = (quantity: number) =>
  Array.from({ length: quantity }, () => generateBasicPerson());
