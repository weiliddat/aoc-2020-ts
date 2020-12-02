"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var lodash_1 = __importDefault(require("lodash"));
var input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
var data = lodash_1.default.split(input, '\n').map(function (row) {
    var parts = lodash_1.default.split(row, ': ');
    var policyParts = /(\d+)-(\d+) (\w)/i.exec(parts[0]);
    var policy = {
        min: lodash_1.default.toInteger(lodash_1.default.get(policyParts, '1', 0)),
        max: lodash_1.default.toInteger(lodash_1.default.get(policyParts, '2', 0)),
        char: lodash_1.default.toString(lodash_1.default.get(policyParts, '3', '')),
    };
    var password = parts[1];
    return {
        policy: policy,
        password: password,
    };
});
function checkValid1(policy, password) {
    return lodash_1.default.inRange(lodash_1.default.filter(password, function (c) { return c === policy.char; }).length, policy.min, policy.max + 1);
}
var validList1 = lodash_1.default.filter(data, function (p) { return checkValid1(p.policy, p.password); });
console.log(validList1.length);
function checkValid2(policy, password) {
    var lettersToCheck = lodash_1.default.at(password, [policy.min - 1, policy.max - 1]);
    var matches = lodash_1.default.filter(lettersToCheck, function (c) { return c === policy.char; }).length;
    return matches === 1;
}
var validList2 = lodash_1.default.filter(data, function (p) { return checkValid2(p.policy, p.password); });
console.log(validList2.length);
