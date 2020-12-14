import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

let adaptors = _.split(input, '\n')
  .map((v) => parseInt(v, 10))
  .sort((a, b) => a - b);

const highest = _.last(adaptors) || 0;

const deviceJoltage = highest + 3;

console.log({ deviceJoltage });

adaptors = [0, ...adaptors, deviceJoltage];

type Diff = Record<number, number>;

const deviceDiffs = _.reduce(
  adaptors,
  (prev, curr, index, list) => {
    const next = list[index + 1];

    if (next) {
      const diff = next - curr;
      prev[diff] = prev[diff] + 1;
    }

    return prev;
  },
  {
    1: 0,
    2: 0,
    3: 0,
  } as Diff,
);

console.log(deviceDiffs);

console.log(deviceDiffs[1] * deviceDiffs[3]);

function mapCombinations(list: number[]) {
  return _.chain(list)
    .tail()
    .reduce(
      (prev, curr) => {
        const diffs = _.sum(
          _.compact([
            _.get(prev, curr - 1),
            _.get(prev, curr - 2),
            _.get(prev, curr - 3),
          ]),
        );

        _.set(prev, curr, diffs);

        return prev;
      },
      { '0': 1 },
    )
    .value();
}

console.log(mapCombinations(adaptors));
