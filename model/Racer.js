class Player {
  constructor(name, pos) {
    this.name = name;
    this.pos = pos;
  }

  goForward() {
    this.pos += 1;
  }
}

export default Player;
