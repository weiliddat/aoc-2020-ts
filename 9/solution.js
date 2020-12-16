"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const listOfNumbers = lodash_1.default.split(input, '\n').map((a) => parseInt(a, 10));
function cross2Unique(numbers) {
    return lodash_1.default.flatMap(numbers, (a) => lodash_1.default.map(numbers, (b) => [a, b])).filter((a) => a[0] !== a[1]);
}
const checkNumbers = (l, ignore) => lodash_1.default.chain(l)
    .find((a, i) => {
    if (i < ignore)
        return false;
    const prev = lodash_1.default.slice(l, i - ignore, i);
    const sums = cross2Unique(prev).map(lodash_1.default.sum);
    return !lodash_1.default.includes(sums, a);
})
    .value();
const weakness = checkNumbers(listOfNumbers, 25);
console.log(weakness);
const indexOfWeakness = lodash_1.default.indexOf(listOfNumbers, weakness);
const possibleNumbers = lodash_1.default.reverse(lodash_1.default.slice(listOfNumbers, 0, indexOfWeakness));
function checkContiguous(l, target) {
    const len = lodash_1.default.size(l);
    let i = 0;
    let j = 1;
    const curr = () => lodash_1.default.slice(l, i, j);
    while (lodash_1.default.sum(curr()) !== target && i < len) {
        if (j > len) {
            i++;
            j = i;
        }
        else {
            j++;
        }
    }
    return curr();
}
const rangeOfWeakness = checkContiguous(possibleNumbers, weakness);
console.log(rangeOfWeakness);
console.log(lodash_1.default.sum([lodash_1.default.min(rangeOfWeakness), lodash_1.default.max(rangeOfWeakness)]));
