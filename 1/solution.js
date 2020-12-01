"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = void 0;
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var input = fs_1.readFileSync('1/input.txt', 'utf-8');
exports.input = input;
var numbers = input.split('\n').map(function (v) { return parseInt(v, 10); });
function cross2(numbers) {
    return lodash_1.flatMap(numbers, function (a, i) { return numbers.filter(function (b, j) { return i !== j; }).map(function (b) { return [a, b]; }); });
}
console.log(cross2(numbers));
