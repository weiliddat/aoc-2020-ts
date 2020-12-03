"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var lodash_1 = __importDefault(require("lodash"));
var input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
var data = lodash_1.default.split(input, '\n').map(function (row) { return lodash_1.default.split(row, ''); });
var getCoord = function (a) { return data[a[1]][a[0] % data[a[1]].length]; };
var addCoord = function (a, b) { return [a[0] + b[0], a[1] + b[1]]; };
function checkTrees(data, curr, step) {
    var treeCount = 0;
    while (curr[1] < data.length) {
        var encountered = getCoord(curr);
        if (encountered === '#') {
            treeCount++;
        }
        curr = addCoord(curr, step);
    }
    return treeCount;
}
var getProduct = function (numbers) { return numbers.reduce(lodash_1.default.multiply); };
var start = [0, 0];
var slopesToCheck = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];
var slopeTrees = lodash_1.default.map(slopesToCheck, function (slope) {
    return checkTrees(data, start, slope);
});
var slopeTreesMultiplied = getProduct(slopeTrees);
console.log(slopeTreesMultiplied);
