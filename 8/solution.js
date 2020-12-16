"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const bootCode = lodash_1.default.split(input, '\n').map((instructionString, line) => {
    const split = lodash_1.default.split(instructionString, ' ');
    const op = split[0];
    const arg = parseInt(split[1]);
    return {
        line,
        op,
        arg,
    };
});
function run(code) {
    let acc = 0;
    let ran = [];
    let curr = lodash_1.default.head(code);
    while (curr && !lodash_1.default.find(ran, { line: curr.line })) {
        ran.push(curr);
        switch (curr.op) {
            case 'acc':
                acc += curr.arg;
                curr = code[curr.line + 1];
                break;
            case 'jmp':
                curr = code[curr.line + curr.arg];
                break;
            case 'nop':
                curr = code[curr.line + 1];
                break;
        }
    }
    return {
        acc,
        ran,
    };
}
const first = run(bootCode);
console.log(first);
const possibleBootCodes = lodash_1.default.chain(bootCode)
    .map((ins) => {
    if (ins.op === 'jmp') {
        return Object.assign(Object.assign({}, ins), { op: 'nop' });
    }
    if (ins.op === 'nop') {
        return Object.assign(Object.assign({}, ins), { op: 'jmp' });
    }
})
    .compact()
    .map((ins) => lodash_1.default.set(lodash_1.default.cloneDeep(bootCode), ins.line, ins))
    .value();
const correct = lodash_1.default.map(possibleBootCodes, run).filter((result) => { var _a; return ((_a = lodash_1.default.last(result.ran)) === null || _a === void 0 ? void 0 : _a.line) === bootCode.length - 1; });
console.log(correct);
