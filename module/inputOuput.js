import { MissionUtils } from '@woowacourse/mission-utils';

export async function getInput(string) {
  const input = await MissionUtils.Console.readLineAsync(string);
  return input;
}

export async function outputData(string) {
  await MissionUtils.Console.print(string);
}
