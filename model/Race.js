import randForward from '../module/randForward.js';

class Race {
  constructor(racers) {
    this.racers = racers;
    this.history = [];
  }

  snapShot() {
    return this.racers.map((racer) => ({ name: racer.name, pos: racer.pos }));
  }

  winner() {
    const posArray = [...this.racers].map((racer) => racer.pos);
    const maxPos = Math.max(...posArray);
    const winner = this.racers.filter((racer) => racer.pos === maxPos);
    return winner;
  }

  tick() {
    this.racers.forEach((racer) => {
      if (randForward()) racer.goForward();
    });
  }
}

export default Race;
