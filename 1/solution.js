"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const path_1 = require("path");
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const numbers = input.split('\n').map((v) => parseInt(v, 10));
function cross2(numbers) {
    return lodash_1.flatMap(numbers, (a) => lodash_1.map(numbers, (b) => [a, b]));
}
function cross3(numbers) {
    return lodash_1.flatMap(numbers, (a) => lodash_1.flatMap(numbers, (b) => lodash_1.map(numbers, (c) => [a, b, c])));
}
function get2020Items(numbers) {
    const sumsTo2020 = lodash_1.filter(numbers, (v) => lodash_1.sum(v) === 2020);
    const first = lodash_1.head(sumsTo2020) || [];
    return first;
}
function getProduct(numbers) {
    return numbers.reduce((a, b) => a * b);
}
const getResult = (list) => getProduct(get2020Items(list));
const firstCrossProduct = cross2(numbers);
const firstResult = getResult(firstCrossProduct);
console.log(firstResult);
const secondCrossProduct = cross3(numbers);
const secondResult = getResult(secondCrossProduct);
console.log(secondResult);
