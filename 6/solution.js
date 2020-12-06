"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var lodash_1 = __importDefault(require("lodash"));
var input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
var answersByGroup = lodash_1.default.split(input, '\n\n').map(function (v) {
    var memberAnswers = lodash_1.default.split(v, '\n').map(function (ans) { return ({
        string: ans,
        list: lodash_1.default.split(ans, ''),
    }); });
    var union = lodash_1.default.union(lodash_1.default.flatMap(memberAnswers, 'list'));
    var intersect = lodash_1.default.intersection.apply(lodash_1.default, lodash_1.default.map(memberAnswers, 'list'));
    return {
        memberAnswers: memberAnswers,
        union: union,
        intersect: intersect,
        anyCount: union.length,
        everyCount: intersect.length,
    };
});
console.dir(answersByGroup, { depth: null });
var sumOfUniqueAnswers = lodash_1.default.sumBy(answersByGroup, 'anyCount');
console.log(sumOfUniqueAnswers);
var sumOfIntersectingAnswers = lodash_1.default.sumBy(answersByGroup, 'everyCount');
console.log(sumOfIntersectingAnswers);
