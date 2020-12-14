import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

type State = '.' | 'L' | '#';

interface Coordinates {
  x: number;
  y: number;
}

interface Position extends Coordinates {
  state: State;
}

const positions: Position[] = _.chain(input)
  .split('\n')
  .flatMap((r, y) =>
    _.split(r, '').map((c, x) => ({ x, y, state: c as State })),
  )
  .value();

function* GameOfLife(
  positions: Position[],
  getNeighbors: (ps: Position[], p: Position) => Position[],
  limit: number,
) {
  let prev: Position[] = positions;
  let curr: Position[] = [];

  while (true) {
    curr = _.map(prev, (p) => {
      const neighbors = getNeighbors(prev, p);
      const occupied = _.filter(neighbors, { state: '#' });

      if (p.state === 'L' && occupied.length === 0) {
        return {
          ...p,
          state: '#',
        };
      }

      if (p.state === '#' && occupied.length >= limit) {
        return {
          ...p,
          state: 'L',
        };
      }

      return p;
    });

    if (_.isEqual(prev, curr)) break;

    yield curr;

    prev = curr;
  }

  return;
}

function getAdjacent(positions: Position[], target: Position) {
  const neighbors = _.filter(
    positions,
    (p) =>
      _.inRange(p.x, target.x - 1, target.x + 2) &&
      _.inRange(p.y, target.y - 1, target.y + 2) &&
      !_.isEqual(target, p),
  );

  return neighbors;
}

function prettyPrint(positions: Position[] | void): void {
  if (!positions) return;
  const byRow = _.groupBy(positions, 'y');
  const byColumns = _.map(byRow, (r) => _.map(r, 'state').join('')).join('\n');
  console.log(byColumns);
  const occupied = _.filter(positions, { state: '#' });
  console.log({ occupied: occupied.length });
}

const gameOfSeats = GameOfLife(positions, getAdjacent, 4);

// prettyPrint(gameOfSeats.next().value);

// for (const round of gameOfSeats) {
//   prettyPrint(round);
// }

function getVisible(positions: Position[], target: Position) {
  const cardinals: Coordinates[] = [
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
  ];

  const visible = _.map(cardinals, (c) => {
    let nextCoord: Coordinates = {
      x: target.x + c.x,
      y: target.y + c.y,
    };

    let atCoord = _.find(positions, { ...nextCoord });

    while (atCoord && atCoord.state === '.') {
      nextCoord = {
        x: nextCoord.x + c.x,
        y: nextCoord.y + c.y,
      };

      atCoord = _.find(positions, { ...nextCoord });
    }

    return atCoord;
  });

  return _.compact(visible);
}

const gameOfLoS = GameOfLife(positions, getVisible, 5);

// prettyPrint(gameOfLoS.next().value);

for (const round of gameOfLoS) {
  prettyPrint(round);
}
