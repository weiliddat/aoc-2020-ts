"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var input = fs_1.readFileSync('1/input.txt', 'utf-8');
var numbers = input.split('\n').map(function (v) { return parseInt(v, 10); });
function cross2(numbers) {
    return lodash_1.flatMap(numbers, function (a) { return lodash_1.map(numbers, function (b) { return [a, b]; }); });
}
var firstCrossProduct = cross2(numbers);
var first2020 = lodash_1.filter(firstCrossProduct, function (v) { return lodash_1.sum(v) === 2020; });
var firstResult = (_a = lodash_1.head(first2020)) === null || _a === void 0 ? void 0 : _a.reduce(function (a, b) { return a * b; });
console.log(firstResult);
function cross3(numbers) {
    return lodash_1.flatMap(numbers, function (a) { return lodash_1.flatMap(numbers, function (b) { return lodash_1.map(numbers, function (c) { return [a, b, c]; }); }); });
}
var secondCrossProduct = cross3(numbers);
var second2020 = lodash_1.filter(secondCrossProduct, function (v) { return lodash_1.sum(v) === 2020; });
var secondResult = (_b = lodash_1.head(second2020)) === null || _b === void 0 ? void 0 : _b.reduce(function (a, b) { return a * b; });
console.log(secondResult);
