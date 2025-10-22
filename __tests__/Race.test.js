import Race from '../model/Race';
import Racer from '../model/Racer';

describe('Race 테스트', () => {
  test('winnter test', () => {
    const racers = ['Sam', 'John', 'Mark'].map((racer) => new Racer(racer, 0));
    const raceModel = new Race(racers);

    const winner = raceModel.winner();

    // expect(winner).toEqual(['Sam', 'John', 'Mark']);
  });
});
