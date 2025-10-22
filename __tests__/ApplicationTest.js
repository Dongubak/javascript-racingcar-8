import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('자동차 경주', () => {
  test('기능 테스트', async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ['pobi,woni', '1'];
    const logs = ['pobi : -', 'woni : ', '최종 우승자 : pobi'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('예외 테스트', async () => {
    // given
    const inputs = ['pobi,javaji'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});

/** =========================================================================================
 * 기능 테스트
 *  - TC-01: 2명 · 1회 시도 · 단독 우승
 *  - TC-02: 3명 · 3회 시도 · 단독 우승
 *  - TC-03: 3명 · 2회 시도 · 공동 우승
 * ======================================================================================= */
describe('기능 테스트 (통합 동작)', () => {
  test.each([
    {
      name: 'TC-01: two players / 1 try / pobi wins',
      inputs: ['pobi,woni', '1'],
      randoms: [4, 3], // pobi(4), woni(3)
      expectLogs: ['pobi : -', 'woni : ', '최종 우승자 : pobi'],
    },
    {
      name: 'TC-02: three players / 3 tries / pobi wins',
      inputs: ['pobi,woni,jun', '3'],
      // 1턴: pobi(4), woni(3), jun(4)
      // 2턴: pobi(4), woni(3), jun(3)
      // 3턴: pobi(4), woni(4), jun(3)
      randoms: [4, 3, 4, 4, 3, 3, 4, 4, 3],
      // 스냅샷이 매 턴마다 출력되므로 대표 라인 몇 개와 최종 우승자만 체크 (순서 무관)
      expectLogs: [
        'pobi : -',
        'woni : ',
        'jun : -',
        'pobi : --',
        'woni : ',
        'jun : -',
        'pobi : ---',
        'woni : -',
        'jun : -',
        '최종 우승자 : pobi',
      ],
    },
    {
      name: 'TC-03: three players / 2 tries / pobi,woni wins',
      inputs: ['pobi,woni,jun', '2'],
      // 1턴: pobi(4), woni(4), jun(3)
      // 2턴: pobi(4), woni(4), jun(3)
      randoms: [4, 4, 3, 4, 4, 3],
      expectLogs: [
        'pobi : -',
        'woni : -',
        'jun : ',
        'pobi : --',
        'woni : --',
        'jun : ',
        '최종 우승자 : pobi, woni',
      ],
    },
  ])('$name', async ({ inputs, randoms, expectLogs }) => {
    const logSpy = getLogSpy();
    mockQuestions(inputs);
    mockRandoms(randoms);

    const app = new App();
    await app.run();

    expectLogs.forEach((line) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(line));
    });
  });
});

/** =========================================================================================
 * 예외 테스트
 *  - TC-04: 이름 입력 예외(빈 문자열)
 *  - TC-05: 이름 입력 예외(5자 초과)
 *  - TC-06: 이름 입력 예외(중복)
 *  - TC-07: 이름 입력 예외(빈 문자열 포함)
 *  - TC-08: 시도 횟수 예외(숫자 아님)
 *  - TC-09: 시도 횟수 예외(음수)
 *  - TC-10: 시도 횟수 예외(0)
 *  ※ 메시지는 “[ERROR]” 포함 여부로 검증 (필요시 상세 메시지로 강화 가능)
 * ======================================================================================= */
describe('예외 테스트 (유효성 검증)', () => {
  test.each([
    {
      name: 'TC-04: empty names',
      inputs: [''], // 이름만 입력 단계에서 즉시 실패
      errorIncludes: '[ERROR]',
    },
    {
      name: 'TC-05: name over 5 chars',
      inputs: ['pobi,javaji'], // 두 번째 입력(시도 횟수)까지 가지 않음
      errorIncludes: '[ERROR]',
    },
    {
      name: 'TC-06: duplicated name',
      inputs: ['pobi,pobi'],
      errorIncludes: '[ERROR]',
    },
    {
      name: 'TC-07: empty name element',
      inputs: ['pobi,'],
      errorIncludes: '[ERROR]',
    },
    {
      name: 'TC-08: trials not a number',
      inputs: ['pobi,woni', 'a'],
      errorIncludes: '[ERROR]',
    },
    {
      name: 'TC-09: trials negative',
      inputs: ['pobi,woni', '-1'],
      errorIncludes: '[ERROR]',
    },
    {
      name: 'TC-10: trials zero',
      inputs: ['pobi,woni', '0'],
      errorIncludes: '[ERROR]',
    },
  ])('$name', async ({ inputs, errorIncludes }) => {
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow(errorIncludes);
  });
});
