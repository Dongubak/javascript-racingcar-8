import {
  isNotDuplicateName,
  isNotEmptyElement,
  isNotOverFiveChar,
} from '../module/isValidNameArray';

describe('isNotEmptyElement 단위 테스트', () => {
  test.each([
    [['Jaspers', 'sanchez'], true],
    [['Jaspers', 'sanchez', ''], false],
    [[''], false],
  ])('isNotEmptyElement(%p) -> %p', (input, expected) => {
    expect(isNotEmptyElement(input)).toBe(expected);
  });
});
describe('isNotOverFiveChar 단위 테스트', () => {
  test.each([
    [['Semi', 'Khang', 'John'], true],
    [['Jaspers', 'sanchez'], false],
  ])('isNotOverFiveChar(%p) -> %p', (input, expected) => {
    expect(isNotOverFiveChar(input)).toBe(expected);
  });
});

describe('isNotDuplicateName 단위 테스트', () => {
  test.each([
    [['Jaspers', 'sanchez'], true],
    [['Jaspers', 'sanchez', 'Jaspers'], false],
  ])('isNotDuplicateName(%p) -> %p', (input, expected) => {
    expect(isNotDuplicateName(input)).toBe(expected);
  });
});
