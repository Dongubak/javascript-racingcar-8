import {
  isNotEmptyString,
  splitWithSeparator,
} from '../module/parseInputString';

describe('isNotEmptyString 단위 모듈 테스트', () => {
  test("'Jaspers,sanchez' 입력", () => {
    const input = 'Jaspers,sanchez';
    const output = isNotEmptyString(input);

    expect(output).toBe(true);
  });
  test('빈 문자열 입력', () => {
    const input = '';
    const output = isNotEmptyString(input);

    expect(output).toBe(false);
  });
});

describe('splitWithSeparator 단위 모듈 테스트', () => {
  test("'Jaspers,sanchez' 입력", () => {
    const input = 'Jaspers,sanchez';
    const output = splitWithSeparator(input);

    expect(output).toEqual(['Jaspers', 'sanchez']);
  });
  test("'Jaspers,sanchez,John' 입력", () => {
    const input = 'Jaspers,sanchez,John';
    const output = splitWithSeparator(input);

    expect(output).toEqual(['Jaspers', 'sanchez', 'John']);
  });
  test('빈 문자열 입력', () => {
    const input = '';
    const output = splitWithSeparator(input);

    expect(output).toEqual(['']);
  });
});
