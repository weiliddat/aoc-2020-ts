"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const bagRules = lodash_1.default.chain(input)
    .split('\n')
    .map((ruleString) => {
    const bagColor = lodash_1.default.get(/^(.+?) bags/i.exec(ruleString), '1');
    const containColorString = lodash_1.default.get(/contain (.+?)\.$/i.exec(ruleString), '1');
    const containColorRule = lodash_1.default.chain(containColorString)
        .split(', ')
        .map((numColorString) => {
        const numColorSearch = /^(.+?) (.+) bag/i.exec(numColorString);
        const numColorResults = lodash_1.default.at(numColorSearch, [2, 1]);
        if (numColorResults[1] !== 'no') {
            return numColorResults;
        }
    })
        .compact()
        .fromPairs()
        .mapValues((v) => parseInt(v))
        .value();
    return {
        bag: bagColor,
        canContain: containColorRule,
    };
})
    .value();
function getAllContains(color) {
    let acc = {};
    let nextSearch = [color];
    while (!lodash_1.default.isEmpty(nextSearch)) {
        const matches = lodash_1.default.map(nextSearch, (c) => lodash_1.default.find(bagRules, { bag: c }));
        const contains = lodash_1.default.compact(lodash_1.default.map(matches, 'canContain').filter((v) => !lodash_1.default.isEmpty(v)));
        lodash_1.default.assign(acc, ...contains);
        nextSearch = lodash_1.default.uniq(lodash_1.default.compact(lodash_1.default.flatMap(contains, lodash_1.default.keys)));
    }
    return acc;
}
const bagRulesFlat = lodash_1.default.map(bagRules, (rule) => (Object.assign(Object.assign({}, rule), { canContain: getAllContains(rule.bag) })));
const canHasShinyGold = lodash_1.default.filter(bagRulesFlat, (r) => lodash_1.default.has(r.canContain, 'shiny gold'));
console.log(canHasShinyGold.length);
function countBags(rule) {
    let acc = [rule.canContain];
    let nextSearch = [rule];
    while (!lodash_1.default.isEmpty(nextSearch)) {
        const matches = lodash_1.default.chain(nextSearch)
            .map('canContain')
            .flatMap((c) => lodash_1.default.flatMap(c, (num, bag) => {
            const found = lodash_1.default.find(bagRules, { bag });
            if (found) {
                return Array(num).fill(found);
            }
            else {
                return [];
            }
        }))
            .value();
        acc.push(...lodash_1.default.map(matches, 'canContain'));
        nextSearch = matches;
    }
    return lodash_1.default.chain(acc)
        .map((c) => lodash_1.default.sum(lodash_1.default.values(c)))
        .sum()
        .value();
}
const shinyGoldBag = lodash_1.default.find(bagRules, { bag: 'shiny gold' });
console.log(countBags(shinyGoldBag));
