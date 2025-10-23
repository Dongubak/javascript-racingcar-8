import { getInput, outputData } from '../module/inputOuput.js';

const INPUT_NAME_MESSAGE =
  '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n';
const INPUT_NUMBER_MESSAGE = '시도할 횟수는 몇 회인가요?\n';

class ConsoleView {
  static async getName() {
    return getInput(INPUT_NAME_MESSAGE);
  }

  static async getNumber() {
    return getInput(INPUT_NUMBER_MESSAGE);
  }

  static async printWinner(winners) {
    const winnerNameArray = winners.map((winner) => winner.name);
    outputData(`최종 우승자 : ${winnerNameArray.join(', ')}\n`);
  }

  static async printSnapShot(snapshot) {
    snapshot.forEach(({ name, pos }) => {
      outputData(`${name} : ${'-'.repeat(pos)}`);
    });
    outputData('');
  }

  static async printResult(history) {
    outputData('\n실행 결과');
    history.forEach((snapshot) => {
      this.printSnapShot(snapshot);
    });
  }
}

export default ConsoleView;
