import { isNotNegative, isNotZero } from '../module/isValidInputNumber';

describe('isNotNegative 단위 모듈 테스트', () => {
  test.each([
    [-1, false],
    [1, true],
  ])('isNotNegative(%p) -> %p', (input, expected) => {
    expect(isNotNegative(input)).toBe(expected);
  });
});

describe('isNotZero 단위 모듈 테스트', () => {
  test.each([
    [1, true],
    [0, false],
  ])('isNotZero(%p) -> %p', (input, expected) => {
    expect(isNotZero(input)).toBe(expected);
  });
});
