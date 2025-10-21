import {
  isNotDuplicateName,
  isNotEmptyElement,
  isNotOverFiveChar,
} from '../module/isValidNameArray';

describe('isNotEmptyElement 단위 테스트', () => {
  test("['Jaspers','sanchez'] 입력", () => {
    const input = ['Jaspers', 'sanchez'];
    const output = isNotEmptyElement(input);

    expect(output).toBe(true);
  });

  test("['Jaspers','sanchez',''] 입력", () => {
    const input = ['Jaspers', 'sanchez', ''];
    const output = isNotEmptyElement(input);

    expect(output).toBe(false);
  });

  test("[''] 입력", () => {
    const input = [''];
    const output = isNotEmptyElement(input);

    expect(output).toBe(false);
  });
});
describe('isNotOverFiveChar 단위 테스트', () => {
  test("['Semi','Khang','John'] 입력", () => {
    const input = ['Semi', 'Khang', 'John'];
    const output = isNotOverFiveChar(input);

    expect(output).toBe(true);
  });
  test("['Jaspers','sanchez'] 입력", () => {
    const input = ['Jaspers', 'sanchez', 'John'];
    const output = isNotOverFiveChar(input);

    expect(output).toBe(false);
  });
});

describe('isNotDuplicateName 단위 테스트', () => {
  test("['Jaspers','sanchez'] 입력", () => {
    const input = ['Jaspers', 'sanchez'];
    const output = isNotDuplicateName(input);

    expect(output).toBe(true);
  });
  test("['Jaspers','sanchez','Jaspers'] 입력", () => {
    const input = ['Jaspers', 'sanchez', 'Jaspers'];
    const output = isNotDuplicateName(input);

    expect(output).toBe(false);
  });
});
