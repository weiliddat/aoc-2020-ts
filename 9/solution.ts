import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const listOfNumbers = _.split(input, '\n').map((a) => parseInt(a, 10));

function cross2Unique(numbers: number[]) {
  return _.flatMap(numbers, (a) =>
    _.map(numbers, (b): [number, number] => [a, b]),
  ).filter((a) => a[0] !== a[1]);
}

const checkNumbers = (l: number[], ignore: number) =>
  _.chain(l)
    .find((a, i) => {
      if (i < ignore) return false;
      const prev = _.slice(l, i - ignore, i);
      const sums = cross2Unique(prev).map(_.sum);
      return !_.includes(sums, a);
    })
    .value();

console.log(checkNumbers(listOfNumbers, 25));
