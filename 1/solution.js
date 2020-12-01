"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var input = fs_1.readFileSync('1/input.txt', 'utf-8');
var numbers = input.split('\n').map(function (v) { return parseInt(v, 10); });
function cross2(numbers) {
    return lodash_1.flatMap(numbers, function (a) { return lodash_1.map(numbers, function (b) { return [a, b]; }); });
}
function cross3(numbers) {
    return lodash_1.flatMap(numbers, function (a) {
        return lodash_1.flatMap(numbers, function (b) { return lodash_1.map(numbers, function (c) { return [a, b, c]; }); });
    });
}
function get2020Items(numbers) {
    var sumsTo2020 = lodash_1.filter(numbers, function (v) { return lodash_1.sum(v) === 2020; });
    var first = lodash_1.head(sumsTo2020) || [];
    return first;
}
function getProduct(numbers) {
    return numbers.reduce(function (a, b) { return a * b; });
}
var getResult = function (list) { return getProduct(get2020Items(list)); };
var firstCrossProduct = cross2(numbers);
var firstResult = getResult(firstCrossProduct);
console.log(firstResult);
var secondCrossProduct = cross3(numbers);
var secondResult = getResult(secondCrossProduct);
console.log(secondResult);
