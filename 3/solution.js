"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const data = lodash_1.default.split(input, '\n').map((row) => lodash_1.default.split(row, ''));
const getCoord = (a) => data[a[1]][a[0] % data[a[1]].length];
const addCoord = (a, b) => [a[0] + b[0], a[1] + b[1]];
function checkTrees(data, curr, step) {
    let treeCount = 0;
    while (curr[1] < data.length) {
        const encountered = getCoord(curr);
        if (encountered === '#') {
            treeCount++;
        }
        curr = addCoord(curr, step);
    }
    return treeCount;
}
const getProduct = (numbers) => numbers.reduce(lodash_1.default.multiply);
const start = [0, 0];
const slopesToCheck = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];
const slopeTrees = lodash_1.default.map(slopesToCheck, (slope) => checkTrees(data, start, slope));
const slopeTreesMultiplied = getProduct(slopeTrees);
console.log(slopeTreesMultiplied);
