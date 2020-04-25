import { Expertise, Gender } from './../types/index';
import mansFirst from 'constants/mansFirst.json';
import womansFirst from 'constants/femaleFirst.json';
import lastNames from 'constants/lastNames.json';
import { BasicPerson } from 'types';
import { v4 as uuid } from 'uuid';
import { avatars, AvatarKey, mansAvatar, womansAvatar } from './avatar';

export const getRandomInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomItem = <T>(array: T[]): T =>
  array[getRandomInRange(0, array.length)];

export const getRandomFirstName = (gender: Gender) =>
  gender === Gender.Man ? getRandomItem(mansFirst) : getRandomItem(womansFirst);

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
  const gender = getRandomItem(Object.values(Gender));
  return {
    firstName: getRandomFirstName(gender),
    lastName: getRandomLastName(),
    expertise,
    salary: calculateSalary(expertise),
    id: uuid(),
    gender,
    avatar: getRandomAvatarKey(gender),
  };
};

export const getRandomAvatarKey = (gender: Gender): AvatarKey =>
  getRandomItem(
    Object.keys(
      gender === Gender.Man ? mansAvatar : womansAvatar
    ) as AvatarKey[]
  );

export const getAvatar = (key: AvatarKey) => avatars[key];

const salaryPerPoint = 20;

export const calculateSalary = (expetise: Expertise): number => {
  return Object.values(expetise).reduce((p, n) => p + n, 0) * salaryPerPoint;
};

export const generatePersons = (quantity: number) =>
  Array.from({ length: quantity }, () => generateBasicPerson());
