import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

type Coord = [x: number, y: number];

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const data = _.split(input, '\n').map((row) => _.split(row, ''));

const getCoord = (a: Coord) => data[a[1]][a[0] % data[a[1]].length];

const addCoord = (a: Coord, b: Coord): Coord => [a[0] + b[0], a[1] + b[1]];

function checkTrees(data: string[][], curr: Coord, step: Coord): number {
  let treeCount = 0;
  while (curr[1] < data.length) {
    const encountered = getCoord(curr);

    if (encountered === '#') {
      treeCount++;
    }

    curr = addCoord(curr, step);
  }
  return treeCount;
}

const getProduct = (numbers: number[]) => numbers.reduce(_.multiply);

const start: Coord = [0, 0];

const slopesToCheck: Coord[] = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const slopeTrees = _.map(slopesToCheck, (slope) =>
  checkTrees(data, start, slope),
);

const slopeTreesMultiplied = getProduct(slopeTrees);

console.log(slopeTreesMultiplied);
