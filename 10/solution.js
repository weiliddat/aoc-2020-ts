"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
let adaptors = lodash_1.default.split(input, '\n')
    .map((v) => parseInt(v, 10))
    .sort((a, b) => a - b);
const highest = lodash_1.default.last(adaptors) || 0;
const deviceJoltage = highest + 3;
console.log({ deviceJoltage });
adaptors = [0, ...adaptors, deviceJoltage];
const deviceDiffs = lodash_1.default.reduce(adaptors, (prev, curr, index, list) => {
    const next = list[index + 1];
    if (next) {
        const diff = next - curr;
        prev[diff] = prev[diff] + 1;
    }
    return prev;
}, {
    1: 0,
    2: 0,
    3: 0,
});
console.log(deviceDiffs);
console.log(deviceDiffs[1] * deviceDiffs[3]);
function mapCombinations(list) {
    return lodash_1.default.chain(list)
        .tail()
        .reduce((prev, curr) => {
        const diffs = lodash_1.default.sum(lodash_1.default.compact([
            lodash_1.default.get(prev, curr - 1),
            lodash_1.default.get(prev, curr - 2),
            lodash_1.default.get(prev, curr - 3),
        ]));
        lodash_1.default.set(prev, curr, diffs);
        return prev;
    }, { '0': 1 })
        .value();
}
console.log(mapCombinations(adaptors));
