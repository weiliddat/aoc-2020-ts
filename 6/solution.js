"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const answersByGroup = lodash_1.default.split(input, '\n\n').map((v) => {
    const memberAnswers = lodash_1.default.split(v, '\n').map((ans) => ({
        string: ans,
        list: lodash_1.default.split(ans, ''),
    }));
    const union = lodash_1.default.union(lodash_1.default.flatMap(memberAnswers, 'list'));
    const intersect = lodash_1.default.intersection(...lodash_1.default.map(memberAnswers, 'list'));
    return {
        memberAnswers,
        union,
        intersect,
        anyCount: union.length,
        everyCount: intersect.length,
    };
});
console.dir(answersByGroup, { depth: null });
const sumOfUniqueAnswers = lodash_1.default.sumBy(answersByGroup, 'anyCount');
console.log(sumOfUniqueAnswers);
const sumOfIntersectingAnswers = lodash_1.default.sumBy(answersByGroup, 'everyCount');
console.log(sumOfIntersectingAnswers);
