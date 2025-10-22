import createError from './createError.js';

const INPUT_VACANCY_ERROR = createError('Input is empty');
const CHARACTERS_FIVE_ERROR = createError('Each name must be <= 5 characters');
const NAME_VACANCY_ERROR = createError('Empty name detected');
const DUPLICATE_NAME_ERROR = createError('Duplicate name found');
const NONE_A_NUMBER = createError('input is none a number');
const NEGATIVE_NUMBER_ERROR = createError('number must be positive');
const ZERO_ERROR = createError('number cannot be zero');

export {
  INPUT_VACANCY_ERROR,
  CHARACTERS_FIVE_ERROR,
  NAME_VACANCY_ERROR,
  DUPLICATE_NAME_ERROR,
  NONE_A_NUMBER,
  NEGATIVE_NUMBER_ERROR,
  ZERO_ERROR,
};
