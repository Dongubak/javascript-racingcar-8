import Race from '../model/Race.js';
import Racer from '../model/Racer.js';
import { parseName, parseNumber } from '../module/index.js';

import ConsoleView from '../view/ConsoleView.js';

class RaceController {
  constructor(view = ConsoleView) {
    this.view = view;
    this.history = [];
  }

  async run() {
    try {
      const name = await this.view.getName();
      const nameList = parseName(name);

      const number = await this.view.getNumber();
      const validNumber = parseNumber(number);

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
}

export default RaceController;
