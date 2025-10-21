class Race {
  constructor(players) {
    this.racers = players;
    this.history = [];
  }

  snapShot() {
    return this.racers.map((racer) => ({ name: racer.name, pos: racer.pos }));
  }

  winner() {
    const maxPos = Math.max([...this.racers].map((racer) => racer.pos));
    const winner = this.racers.filter((racer) => racer.pos === maxPos);
    return winner;
  }

  tick() {}
}

export default Race;
