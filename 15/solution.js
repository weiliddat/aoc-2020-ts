"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const bench_1 = require("../helpers/bench");
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const starting = lodash_1.default.split(input, ',').map((v) => parseInt(v, 10));
console.log({ starting });
function memoryGameCount(starting, end) {
    let list = lodash_1.default.clone(starting);
    let lastSpoken = list[list.length - 1];
    for (let i = 0; i < end - starting.length; i++) {
        let last1 = list.lastIndexOf(lastSpoken);
        if (last1 === -1) {
            list.push(0);
        }
        else {
            let last2 = list.lastIndexOf(lastSpoken, last1 - 1);
            if (last2 === -1) {
                list.push(0);
            }
            else {
                list.push(last1 - last2);
            }
        }
        lastSpoken = list[list.length - 1];
    }
    return { lastSpoken, list };
}
function memoryGameMemorize(starting, end) {
    let list = lodash_1.default.fromPairs(lodash_1.default.range(0, end).map((n) => [n, []]));
    lodash_1.default.each(starting, (num, i) => pushEntry(list, num, i));
    let lastSpoken = starting[starting.length - 1];
    for (let i = starting.length; i < end; i++) {
        let entry = list[lastSpoken];
        if (lodash_1.default.isNil(entry) || lodash_1.default.isNil(entry[0]) || lodash_1.default.isNil(entry[1])) {
            lastSpoken = 0;
        }
        else {
            lastSpoken = entry[0] - entry[1];
        }
        list = pushEntry(list, lastSpoken, i);
    }
    return { lastSpoken, list };
}
function pushEntry(entries, number, index) {
    entries[number] = cycle(entries[number], index);
    return entries;
}
function cycle(old, index) {
    return !lodash_1.default.isNil(old[0]) ? [index, old[0]] : [index];
}
bench_1.bench(() => console.log(memoryGameCount(starting, 300000).lastSpoken));
bench_1.bench(() => console.log(memoryGameMemorize(starting, 300000).lastSpoken));
