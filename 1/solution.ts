import { readFileSync } from 'fs';
import { filter, flatMap, head, map, sum } from 'lodash';

const input = readFileSync('1/input.txt', 'utf-8');

const numbers = input.split('\n').map((v) => parseInt(v, 10));

function cross2(numbers: number[]) {
    return flatMap(numbers, (a) => map(numbers, (b) => [a, b]));
}

const firstCrossProduct = cross2(numbers);

const first2020 = filter(firstCrossProduct, (v) => sum(v) === 2020);

const firstResult = head(first2020)?.reduce((a, b) => a * b);

console.log(firstResult);

function cross3(numbers: number[]) {
    return flatMap(numbers, (a) => flatMap(numbers, (b) => map(numbers, (c) => [a, b, c])));
}

const secondCrossProduct = cross3(numbers);

const second2020 = filter(secondCrossProduct, (v) => sum(v) === 2020);

const secondResult = head(second2020)?.reduce((a, b) => a * b);

console.log(secondResult);
