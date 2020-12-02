import { readFileSync } from 'fs';
import { filter, flatMap, head, map, sum } from 'lodash';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const numbers = input.split('\n').map((v) => parseInt(v, 10));

function cross2(numbers: number[]) {
  return flatMap(numbers, (a) => map(numbers, (b) => [a, b]));
}

function cross3(numbers: number[]) {
  return flatMap(numbers, (a) =>
    flatMap(numbers, (b) => map(numbers, (c) => [a, b, c])),
  );
}

function get2020Items(numbers: number[][]) {
  const sumsTo2020 = filter(numbers, (v) => sum(v) === 2020);
  const first = head(sumsTo2020) || [];
  return first;
}

function getProduct(numbers: number[]) {
  return numbers.reduce((a, b) => a * b);
}

const getResult = (list: number[][]) => getProduct(get2020Items(list));

const firstCrossProduct = cross2(numbers);

const firstResult = getResult(firstCrossProduct);

console.log(firstResult);

const secondCrossProduct = cross3(numbers);

const secondResult = getResult(secondCrossProduct);

console.log(secondResult);
