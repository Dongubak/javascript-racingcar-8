import Race from '../model/Race.js';
import Racer from '../model/Racer.js';
import {
  isNotNegative,
  isNotZero,
  isNumber,
} from '../module/isValidInputNumber.js';
import {
  isNotDuplicateName,
  isNotEmptyElement,
  isNotOverFiveChar,
} from '../module/isValidNameArray.js';
import {
  isNotEmptyString,
  splitWithSeparator,
} from '../module/parseInputString.js';
import ConsoleView from '../view/ConsoleView.js';

class RaceController {
  constructor(view = new ConsoleView()) {
    this.view = view;
  }

  async run() {
    try {
      const name = await this.view.getName();
      const nameList = this.parseName(name);

      const number = await this.view.getNumber();
      const validNumber = this.parseNumber(number);

      const racers = nameList.map((racer) => new Racer(racer, 0));
      const racer = new Race(racers);

      for (let i = 0; i < validNumber; i += 1) {
        racer.tick();
        this.view.printSnapShot(racer.snapShot());
      }
      this.view.printWinner(racer.winner());
    } catch (e) {
      throw Error(e);
    }
  }

  parseName(name) {
    if (!isNotEmptyString(name)) throw new Error();
    const nameArray = splitWithSeparator(name);
    if (!isNotEmptyElement(nameArray)) throw new Error();
    if (!isNotOverFiveChar(nameArray)) throw new Error();
    if (!isNotDuplicateName(nameArray)) throw new Error();

    return nameArray;
  }

  parseNumber(numberString) {
    if (!isNumber(numberString)) throw new Error();
    const number = +numberString;
    if (!isNotNegative(number)) throw new Error();
    if (!isNotZero(number)) throw new Error();
    return number;
  }
}

export default RaceController;
