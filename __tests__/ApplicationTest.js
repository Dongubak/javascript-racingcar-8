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

describe('추가 기능 테스트 (확장 케이스)', () => {
  const MOVING = 4;
  const STOP = 3;

  test('TC-11: 세 플레이어 / 3회 시도 / woni, jun 공동 우승', async () => {
    // 입력
    const inputs = ['pobi,woni,jun', '3'];
    // 라운드 별 랜덤:
    // 1R: pobi(3), woni(4), jun(4)
    // 2R: pobi(4), woni(3), jun(4)
    // 3R: pobi(3), woni(4), jun(3)
    const randoms = [
      STOP,
      MOVING,
      MOVING,
      MOVING,
      STOP,
      MOVING,
      STOP,
      MOVING,
      STOP,
    ];

    const logSpy = getLogSpy();
    mockQuestions(inputs);
    mockRandoms(randoms);

    const app = new App();
    await app.run();

    // 일부 스냅샷 라인과 최종 우승자 검증
    [
      'pobi : ', // 1R
      'woni : -',
      'jun : -',
      'pobi : -', // 2R
      'jun : --',
      'woni : --', // 3R
      '최종 우승자 : woni, jun',
    ].forEach((line) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(line));
    });
  });

  test('TC-12: 모두 같은 점수로 공동 우승(전 라운드 모두 이동)', async () => {
    const inputs = ['a,b,c', '2'];
    // 모든 트라이에서 모두 4 이상 → 모두 동일하게 2칸 이동
    const randoms = [4, 4, 4, 4, 4, 4];

    const logSpy = getLogSpy();
    mockQuestions(inputs);
    mockRandoms(randoms);

    const app = new App();
    await app.run();

    [
      'a : -',
      'b : -',
      'c : -',
      'a : --',
      'b : --',
      'c : --',
      '최종 우승자 : a, b, c',
    ].forEach((line) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(line));
    });
  });

  test('TC-13: 단일 참가자 / 다회 시도 → 스냅샷 횟수 및 우승자 검증', async () => {
    const inputs = ['solo', '4'];
    // 이동/정지 섞어서 4턴
    const randoms = [4, 3, 4, 4]; // -, (정지), -, -

    const logSpy = getLogSpy();
    mockQuestions(inputs);
    mockRandoms(randoms);

    const app = new App();
    await app.run();

    // 스냅샷 라인 총 4회 출력(각 라운드마다 1줄)
    const snapshotCalls = logSpy.mock.calls
      .map((args) => args[0])
      .filter((msg) => msg.includes('solo :')).length;
    expect(snapshotCalls).toBe(4);

    // 최종 우승자
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 우승자 : solo')
    );
  });

  test('TC-14: 경계값 검증 - 랜덤이 3이면 정지, 4면 전진', async () => {
    const inputs = ['edge', '2'];
    // 1R: 3 → 정지, 2R: 4 → 전진
    const randoms = [3, 4];

    const logSpy = getLogSpy();
    mockQuestions(inputs);
    mockRandoms(randoms);

    const app = new App();
    await app.run();

    // 첫 라운드 정지(대시 없음), 둘째 라운드 1칸 이동
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('edge : ')); // 1R
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('edge : -')); // 2R
  });

  // test('TC-15: 출력에 "실행 결과" 머리글이 포함되는지(형식 검증)', async () => {
  //   const inputs = ['pobi,woni', '1'];
  //   const randoms = [4, 4];

  //   const logSpy = getLogSpy();
  //   mockQuestions(inputs);
  //   mockRandoms(randoms);

  //   const app = new App();
  //   await app.run();

  //   expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('실행 결과'));
  // });

  // test('TC-16: 입력 2회만 수행(이름, 시도 횟수) - readLineAsync 호출 횟수 검증', async () => {
  //   const inputs = ['pobi,woni', '2'];
  //   mockQuestions(inputs);
  //   mockRandoms([4, 4, 4, 4]); // (무관)

  //   const app = new App();
  //   await app.run();

  //   // 이름 + 시도 횟수 총 2회 질문
  //   expect(MissionUtils.Console.readLineAsync).toHaveBeenCalledTimes(2);
  // });

  test('TC-17: 랜덤 호출 횟수 = (참가자 수 * 시도 횟수) 검증', async () => {
    const inputs = ['a,b,c', '5'];
    const tries = 5;
    const players = 3;
    const totalRandomCalls = tries * players;

    // 임의 값만큼 mockReturnValueOnce 체이닝
    mockQuestions(inputs);
    mockRandoms(Array.from({ length: totalRandomCalls }, () => 4));

    const pickSpy = jest.spyOn(MissionUtils.Random, 'pickNumberInRange');

    const app = new App();
    await app.run();

    expect(pickSpy).toHaveBeenCalledTimes(totalRandomCalls);
    pickSpy.mockRestore();
  });

  test('TC-18: 중간 라운드 전원 정지 → 이후 라운드 이동 정상 반영', async () => {
    const inputs = ['a,b', '3'];
    // 1R: 이동/이동, 2R: 전원 정지, 3R: 이동/정지
    const randoms = [4, 4, 3, 3, 4, 3];

    const logSpy = getLogSpy();
    mockQuestions(inputs);
    mockRandoms(randoms);

    const app = new App();
    await app.run();

    [
      'a : -',
      'b : -',
      'a : -', // 2R에서도 변화 없음(이전과 동일)
      'b : -',
      'a : --', // 3R에서 a만 추가 이동
      'b : -',
      '최종 우승자 : a',
    ].forEach((line) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(line));
    });
  });
});

describe('추가 예외 테스트 (강화)', () => {
  test('TC-19: 이름에 공백만 들어온 경우(빈 문자열 취급)', async () => {
    mockQuestions(['   ']); // 공백
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('TC-20: 이름 구분자 끝에 콤마로 빈 이름 요소 포함', async () => {
    mockQuestions(['pobi,', '2']);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('TC-21: 시도 횟수에 공백/개행 등이 섞인 경우 숫자 아님 처리', async () => {
    mockQuestions(['pobi,woni', ' \n']);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('TC-22: 시도 횟수에 실수 입력(정수가 아님)', async () => {
    mockQuestions(['pobi,woni', '1.5']);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
