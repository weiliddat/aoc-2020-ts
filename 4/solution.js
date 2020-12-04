"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var lodash_1 = __importDefault(require("lodash"));
var input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
var passports = lodash_1.default.split(input, '\n\n')
    .map(function (ps) { return lodash_1.default.split(ps, /\s/); })
    .map(function (ps) {
    return lodash_1.default.reduce(ps, function (prev, curr) {
        var _a;
        var _b = lodash_1.default.split(curr, ':'), key = _b[0], value = _b[1];
        return __assign(__assign({}, prev), (_a = {}, _a[key] = value, _a));
    }, {});
});
var requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
var fieldsWithValidator = [
    {
        field: 'byr',
        validator: function (v) {
            return /^\d{4}$/i.test(v) && lodash_1.default.inRange(parseInt(v, 10), 1920, 2003);
        },
    },
    {
        field: 'iyr',
        validator: function (v) {
            return /^\d{4}$/i.test(v) && lodash_1.default.inRange(parseInt(v, 10), 2010, 2021);
        },
    },
    {
        field: 'eyr',
        validator: function (v) {
            return /^\d{4}$/i.test(v) && lodash_1.default.inRange(parseInt(v, 10), 2020, 2031);
        },
    },
    {
        field: 'hgt',
        validator: function (v) {
            return /^\d+cm$/i.test(v)
                ? lodash_1.default.inRange(parseInt(lodash_1.default.get(/^(\d+)cm$/i.exec(v), 0, ''), 10), 150, 194)
                : /^\d+in$/i.test(v)
                    ? lodash_1.default.inRange(parseInt(lodash_1.default.get(/^(\d+)in$/i.exec(v), 0, ''), 10), 59, 77)
                    : false;
        },
    },
    {
        field: 'hcl',
        validator: function (v) { return /^#[0-9a-f]{6}$/i.test(v); },
    },
    {
        field: 'ecl',
        validator: function (v) {
            return lodash_1.default.includes(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'], v);
        },
    },
    {
        field: 'pid',
        validator: function (v) { return /^\d{9}$/i.test(v); },
    },
];
var passportMissingFields = lodash_1.default.map(passports, function (p) {
    return lodash_1.default.reject(requiredFields, function (f) { return lodash_1.default.includes(lodash_1.default.keys(p), f); });
});
var passportsWithRequiredFields = lodash_1.default.filter(passportMissingFields, lodash_1.default.isEmpty);
console.log(passportsWithRequiredFields.length);
var validPassports = lodash_1.default.filter(passports, function (p) {
    return lodash_1.default.every(fieldsWithValidator, function (f) { return lodash_1.default.has(p, f.field) && f.validator(lodash_1.default.get(p, f.field)); });
});
console.log(validPassports.length);
