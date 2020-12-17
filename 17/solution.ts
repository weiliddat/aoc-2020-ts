import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';
import { bench } from '../helpers/bench';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

/**
 * 1-based
 */
interface Dimensions {
  x: number;
  y: number;
  z: number;
}

/**
 * 0-based
 */
interface Coord {
  x: number;
  y: number;
  z: number;
}

interface CubeState extends Dimensions {
  state: (true | false | undefined)[];
}

const startState: CubeState = {
  x: _.split(input, '\n').length,
  y: _.split(input, '\n')[0].length,
  z: 1,
  state: _.replace(input, /\n/g, '')
    .split('')
    .map((c) => c === '#'),
};

// console.log(startState);

function getNeighbors(cube: CubeState, index: number) {
  const offsets = cross3([-1, 0, 1]);
  const dimensions = _.pick(cube, ['x', 'y', 'z']) as Dimensions;
  const coord = getCoord(dimensions, index);

  const neighbors = _.map(offsets, (offset) => {
    const index = getIndex(dimensions, {
      x: coord.x + offset[0],
      y: coord.y + offset[1],
      z: coord.z + offset[2],
    });
    return cube.state[index];
  });
}

function getCoord(dim: Dimensions, index: number) {
  const i = index;

  const [z, zr] = dwr(i, dim.x * dim.y);
  const [y, x] = dwr(zr, dim.x);

  return { x, y, z };
}

function getIndex(dim: Dimensions, coord: Coord) {
  return coord.x + coord.y * dim.x + coord.z * dim.x * dim.y;
}

function dwr(a: number, b: number): [quo: number, rem: number] {
  return [Math.floor(a / b), a % b];
}

/**
 * hey, reuse from 1!
 */
function cross3(numbers: number[]) {
  return _.flatMap(numbers, (a) =>
    _.flatMap(numbers, (b) =>
      _.map(numbers, (c) => [a, b, c] as [x: number, y: number, z: number]),
    ),
  );
}

console.log(getCoord({ x: 5, y: 5, z: 2 }, 7));
console.log(getIndex({ x: 5, y: 5, z: 2 }, { x: 2, y: 1, z: 0 }));
