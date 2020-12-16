"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const passports = lodash_1.default.split(input, '\n\n')
    .map((ps) => lodash_1.default.split(ps, /\s/))
    .map((ps) => lodash_1.default.reduce(ps, (prev, curr) => {
    const [key, value] = lodash_1.default.split(curr, ':');
    return Object.assign(Object.assign({}, prev), { [key]: value });
}, {}));
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const fieldsWithValidator = [
    {
        field: 'byr',
        validator: (v) => /^\d{4}$/i.test(v) && lodash_1.default.inRange(parseInt(v, 10), 1920, 2003),
    },
    {
        field: 'iyr',
        validator: (v) => /^\d{4}$/i.test(v) && lodash_1.default.inRange(parseInt(v, 10), 2010, 2021),
    },
    {
        field: 'eyr',
        validator: (v) => /^\d{4}$/i.test(v) && lodash_1.default.inRange(parseInt(v, 10), 2020, 2031),
    },
    {
        field: 'hgt',
        validator: (v) => /^\d+cm$/i.test(v)
            ? lodash_1.default.inRange(parseInt(lodash_1.default.get(/^(\d+)cm$/i.exec(v), 0, ''), 10), 150, 194)
            : /^\d+in$/i.test(v)
                ? lodash_1.default.inRange(parseInt(lodash_1.default.get(/^(\d+)in$/i.exec(v), 0, ''), 10), 59, 77)
                : false,
    },
    {
        field: 'hcl',
        validator: (v) => /^#[0-9a-f]{6}$/i.test(v),
    },
    {
        field: 'ecl',
        validator: (v) => lodash_1.default.includes(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'], v),
    },
    {
        field: 'pid',
        validator: (v) => /^\d{9}$/i.test(v),
    },
];
const passportMissingFields = lodash_1.default.map(passports, (p) => lodash_1.default.reject(requiredFields, (f) => lodash_1.default.includes(lodash_1.default.keys(p), f)));
const passportsWithRequiredFields = lodash_1.default.filter(passportMissingFields, lodash_1.default.isEmpty);
console.log(passportsWithRequiredFields.length);
const validPassports = lodash_1.default.filter(passports, (p) => lodash_1.default.every(fieldsWithValidator, (f) => lodash_1.default.has(p, f.field) && f.validator(lodash_1.default.get(p, f.field))));
console.log(validPassports.length);
