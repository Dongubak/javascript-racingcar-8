import {
  isNotEmptyString,
  isNumber,
  splitWithSeparator,
} from '../module/parseInputString';

describe('isNotEmptyString 단위 모듈 테스트', () => {
  test.each([
    ['Jaspers,sanchez', true],
    ['', false],
  ])('isNotEmptyString(%p)->(%p)', (input, expected) => {
    expect(isNotEmptyString(input)).toBe(expected);
  });
});

describe('splitWithSeparator 단위 모듈 테스트', () => {
  test.each([
    ['Jaspers,sanchez', ['Jaspers', 'sanchez']],
    ['Jaspers,sanchez,John', ['Jaspers', 'sanchez', 'John']],
    ['', ['']],
  ])('splitWithSeparator(%p)->(%p)', (input, expected) => {
    expect(splitWithSeparator(input)).toEqual(expected);
  });
});

describe('isNumber 단위 모듈 테스트', () => {
  test.each([
    [-1, true],
    [123, true],
    ['a', false],
  ])('isNumber(%p)->(%p)', (input, expected) => {
    expect(isNumber(input)).toBe(expected);
  });
});
