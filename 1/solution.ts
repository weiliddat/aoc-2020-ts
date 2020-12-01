import { readFileSync } from 'fs';
import { filter, flatMap, sum } from 'lodash';

const input = readFileSync('1/input.txt', 'utf-8');

const numbers = input.split('\n').map((v) => parseInt(v, 10));

function cross2(numbers: number[]) {
    return flatMap(numbers, (a, i) => numbers.filter((b, j) => i !== j).map((b) => [a, b]));
}

const firstCrossProduct = cross2(numbers);

const first2020 = filter(firstCrossProduct, (v) => sum(v) === 2020);

console.log(first2020);

export { input };
