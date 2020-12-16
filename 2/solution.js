"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const data = lodash_1.default.split(input, '\n').map((row) => {
    const parts = lodash_1.default.split(row, ': ');
    const policyParts = /(\d+)-(\d+) (\w)/i.exec(parts[0]);
    const policy = {
        min: lodash_1.default.toInteger(lodash_1.default.get(policyParts, '1', 0)),
        max: lodash_1.default.toInteger(lodash_1.default.get(policyParts, '2', 0)),
        char: lodash_1.default.toString(lodash_1.default.get(policyParts, '3', '')),
    };
    const password = parts[1];
    return {
        policy,
        password,
    };
});
function checkValid1(policy, password) {
    return lodash_1.default.inRange(lodash_1.default.filter(password, (c) => c === policy.char).length, policy.min, policy.max + 1);
}
const validList1 = lodash_1.default.filter(data, (p) => checkValid1(p.policy, p.password));
console.log(validList1.length);
function checkValid2(policy, password) {
    const lettersToCheck = lodash_1.default.at(password, [policy.min - 1, policy.max - 1]);
    const matches = lodash_1.default.filter(lettersToCheck, (c) => c === policy.char).length;
    return matches === 1;
}
const validList2 = lodash_1.default.filter(data, (p) => checkValid2(p.policy, p.password));
console.log(validList2.length);
