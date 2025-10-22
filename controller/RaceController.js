import {
  CHARACTERS_FIVE_ERROR,
  DUPLICATE_NAME_ERROR,
  INPUT_VACANCY_ERROR,
  NAME_VACANCY_ERROR,
  NEGATIVE_NUMBER_ERROR,
  NONE_A_NUMBER,
  ZERO_ERROR,
} from '../lib/errortype.js';
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
    this.history = [];
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
        this.history.push(racer.snapShot());
      }

      this.view.printResult([...this.history]);
      this.view.printWinner(racer.winner());
    } catch (e) {
      throw Error(e);
    }
  }

  parseName(name) {
    if (!isNotEmptyString(name)) throw new Error(INPUT_VACANCY_ERROR);
    const nameArray = splitWithSeparator(name);
    if (!isNotEmptyElement(nameArray)) throw new Error(NAME_VACANCY_ERROR);
    if (!isNotOverFiveChar(nameArray)) throw new Error(CHARACTERS_FIVE_ERROR);
    if (!isNotDuplicateName(nameArray)) throw new Error(DUPLICATE_NAME_ERROR);

    return nameArray;
  }

  parseNumber(numberString) {
    if (!isNumber(numberString)) throw new Error(NONE_A_NUMBER);
    const number = +numberString;
    if (!isNotNegative(number)) throw new Error(NEGATIVE_NUMBER_ERROR);
    if (!isNotZero(number)) throw new Error(ZERO_ERROR);
    return number;
  }
}

export default RaceController;
