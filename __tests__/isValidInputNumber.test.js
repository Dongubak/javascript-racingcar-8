import { isNotNegative, isNotZero } from '../module/isValidInputNumber';

describe('isNotNegative 단위 모듈 테스트', () => {
  test('-1 입력', () => {
    const input = -1;
    const output = isNotNegative(input);

    expect(output).toBe(false);
  });
  test('1 입력', () => {
    const input = 1;
    const output = isNotNegative(input);

    expect(output).toBe(true);
  });
});

describe('isNotZero 단위 모듈 테스트', () => {
  test('1 입력', () => {
    const input = 1;
    const output = isNotZero(input);

    expect(output).toBe(true);
  });
  test('0 입력', () => {
    const input = 0;
    const output = isNotZero(input);

    expect(output).toBe(false);
  });
});
