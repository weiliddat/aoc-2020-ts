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
/**
 * pre allocate
 * use 1-based index to allocate 0 as default
 */
function memoryGameMemorize(starting, end) {
    const max = lodash_1.default.max([...starting, end]) || 0;
    let list = lodash_1.default.fromPairs(lodash_1.default.range(0, max + 1).map((n) => [n, 0]));
    lodash_1.default.each(starting.slice(0, -1), (num, i) => (list[num] = i + 1));
    let spoken = starting[starting.length - 1];
    for (let i = starting.length; i < end; i++) {
        let prevIndex = list[spoken];
        list[spoken] = i;
        if (prevIndex) {
            spoken = i - prevIndex;
        }
        else {
            spoken = 0;
        }
    }
    return { spoken, list };
}
// bench(() => console.log(memoryGameCount(starting, 30000000).lastSpoken));
bench_1.bench(() => console.log(memoryGameMemorize(starting, 30000000).spoken));
