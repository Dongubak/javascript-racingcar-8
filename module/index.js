import {
  CHARACTERS_FIVE_ERROR,
  DUPLICATE_NAME_ERROR,
  INPUT_VACANCY_ERROR,
  NAME_VACANCY_ERROR,
  NEGATIVE_NUMBER_ERROR,
  NONE_A_NUMBER,
  ZERO_ERROR,
} from '../lib/errortype.js';
import { isNotNegative, isNotZero, isNumber } from './isValidInputNumber.js';
import {
  isNotDuplicateName,
  isNotEmptyElement,
  isNotOverFiveChar,
} from './isValidNameArray.js';
import { isNotEmptyString, splitWithSeparator } from './parseInputString.js';

export function parseName(name) {
  if (!isNotEmptyString(name)) throw new Error(INPUT_VACANCY_ERROR);
  const nameArray = splitWithSeparator(name);
  if (!isNotEmptyElement(nameArray)) throw new Error(NAME_VACANCY_ERROR);
  if (!isNotOverFiveChar(nameArray)) throw new Error(CHARACTERS_FIVE_ERROR);
  if (!isNotDuplicateName(nameArray)) throw new Error(DUPLICATE_NAME_ERROR);

  return nameArray;
}

export function parseNumber(numberString) {
  if (!isNumber(numberString)) throw new Error(NONE_A_NUMBER);
  const number = +numberString;
  if (!isNotNegative(number)) throw new Error(NEGATIVE_NUMBER_ERROR);
  if (!isNotZero(number)) throw new Error(ZERO_ERROR);
  return number;
}
