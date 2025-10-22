import { MissionUtils } from '@woowacourse/mission-utils';

export default function randForward() {
  const randValue = MissionUtils.Random.pickNumberInRange(0, 9);
  return randValue >= 4;
}
