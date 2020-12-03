import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

type Coord = [x: number, y: number];

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const data = _.split(input, '\n').map((row) => _.split(row, ''));

const getCoord = (coord: Coord) =>
  data[coord[1]][coord[0] % data[coord[1]].length];

const addCoord = (a: Coord, b: Coord): Coord => [a[0] + b[0], a[1] + b[1]];

let curr: Coord = [0, 0];
const step: Coord = [3, 1];
let treeCount = 0;

while (curr[1] < data.length) {
  const encountered = getCoord(curr);

  if (encountered === '#') {
    treeCount++;
  }

  curr = addCoord(curr, step);
}

console.log(treeCount);
