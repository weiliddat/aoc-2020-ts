"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const instructions = lodash_1.default.chain(input)
    .split('\n')
    .map((line) => {
    const isMask = /^mask/i.test(line);
    if (isMask) {
        const valueResult = /^mask \= (.+)$/i.exec(line);
        const value = valueResult ? valueResult[1] : '';
        return {
            type: 'mask',
            value: value,
        };
    }
    const valueResult = /^mem\[(.+)\] \= (.+)$/i.exec(line);
    const address = valueResult ? valueResult[1] : '';
    const value = valueResult ? valueResult[2] : '';
    return {
        type: 'mem',
        address: parseInt(address, 10),
        value: parseInt(value, 10),
    };
})
    .value();
function dec2Bin(dec) {
    return lodash_1.default.padStart(dec.toString(2), 36, '0');
}
function bin2Dec(bin) {
    return parseInt(bin, 2);
}
function applyMask(mask, dec) {
    const bin = dec2Bin(dec);
    const masked = lodash_1.default.map(bin, (char, i) => mask[i] === 'X' ? char : mask[i]).join('');
    const value = bin2Dec(masked);
    return value;
}
const memoryAfterMask = lodash_1.default.reduce(instructions, (prev, curr) => {
    if (curr.type === 'mask') {
        prev.currentMask = curr.value;
    }
    if (curr.type === 'mem') {
        prev.memory[curr.address] = applyMask(prev.currentMask, curr.value);
    }
    return prev;
}, {
    currentMask: '',
    memory: {},
});
// console.log(memoryAfterMask);
console.log(lodash_1.default.sum(lodash_1.default.values(memoryAfterMask.memory)));
function applyMemoryMask(mask, address) {
    const bin = dec2Bin(address);
    const masked = lodash_1.default.reduce(mask, (addresses, char, i) => {
        if (mask[i] === '1') {
            addresses = lodash_1.default.map(addresses, (a) => replaceStrAt(a, i, char));
        }
        if (mask[i] === 'X') {
            addresses = lodash_1.default.flatMap(addresses, (a) => [
                replaceStrAt(a, i, '0'),
                replaceStrAt(a, i, '1'),
            ]);
        }
        return addresses;
    }, [bin]);
    return lodash_1.default.map(masked, (m) => bin2Dec(m));
}
function replaceStrAt(str, at, char) {
    if (at >= str.length)
        return str;
    return str.slice(0, at) + char + str.slice(at + 1);
}
const memoryAfterMemoryMask = lodash_1.default.reduce(instructions, (prev, curr) => {
    if (curr.type === 'mask') {
        prev.currentMask = curr.value;
    }
    if (curr.type === 'mem') {
        const addresses = applyMemoryMask(prev.currentMask, curr.address);
        lodash_1.default.each(addresses, (a) => (prev.memory[a] = curr.value));
    }
    return prev;
}, {
    currentMask: '',
    memory: {},
});
// console.log(memoryAfterMemoryMask.memory);
console.log(lodash_1.default.sum(lodash_1.default.values(memoryAfterMemoryMask.memory)));
