"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const data = lodash_1.default.split(input, '\n');
const timestamp = parseInt(data[0], 10);
const buses = data[1]
    .split(',')
    .filter((b) => b !== 'x')
    .map((b) => parseInt(b, 10));
const timestampConstraints = lodash_1.default.split(data[1], ',')
    .map((b, i) => ({ b, i }))
    .filter((v) => v.b !== 'x')
    .map((v) => (Object.assign(Object.assign({}, v), { b: parseInt(v.b, 10) })));
// .map((v) => ({ ...v, r: v.i === 0 ? v.i : v.b - v.i }));
const fits = (cs, t) => lodash_1.default.every(cs, (c) => (t + c.i) % c.b === 0);
function findConstraints(constraints, start, factor) {
    const fitsConstraint = lodash_1.default.partial(fits, constraints);
    const first = lodash_1.default.head(constraints);
    if (!first)
        return 0;
    let t = start !== null && start !== void 0 ? start : 0;
    let f = factor !== null && factor !== void 0 ? factor : first.b;
    t += f;
    while (!fitsConstraint(t) && t < Number.MAX_SAFE_INTEGER) {
        t += f;
    }
    return t;
}
function factorConstraints(constraints) {
    let prev = constraints[0].b;
    let curr = 0;
    let next = 0;
    let factor = undefined;
    for (let i = 1; i <= constraints.length; i++) {
        const slice = lodash_1.default.slice(constraints, 0, i);
        curr = findConstraints(slice, curr, factor);
        if (i === constraints.length)
            break;
        next = findConstraints(slice, curr, factor);
        factor = next - curr;
        prev = curr;
    }
    return curr;
}
console.log(timestampConstraints);
bench(() => console.log(factorConstraints(timestampConstraints)));
bench(() => console.log(findConstraints(timestampConstraints)));
function bench(func) {
    const start = new Date().valueOf();
    func();
    const end = new Date().valueOf();
    console.log(end - start);
}
