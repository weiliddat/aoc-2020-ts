"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const planeRows = 128;
const planeCols = 8;
const boardingTickets = lodash_1.default.split(input, '\n');
const ticketSeats = lodash_1.default.map(boardingTickets, (seatInstruction) => {
    const rowInstruction = lodash_1.default.slice(seatInstruction, 0, 7);
    const colInstruction = lodash_1.default.slice(seatInstruction, 7, 11);
    const row = lodash_1.default.reduce(rowInstruction, (prev, curr) => {
        if (curr === 'F') {
            return {
                start: prev.start,
                len: prev.len / 2,
            };
        }
        return {
            start: prev.start + prev.len / 2,
            len: prev.len / 2,
        };
    }, { start: 0, len: planeRows });
    const col = lodash_1.default.reduce(colInstruction, (prev, curr) => {
        if (curr === 'L') {
            return {
                start: prev.start,
                len: prev.len / 2,
            };
        }
        return {
            start: prev.start + prev.len / 2,
            len: prev.len / 2,
        };
    }, { start: 0, len: planeCols });
    return {
        row,
        col,
        ID: row.start * 8 + col.start,
    };
});
console.log(ticketSeats);
const highestID = lodash_1.default.maxBy(ticketSeats, 'ID');
console.log(highestID);
const lowestID = lodash_1.default.minBy(ticketSeats, 'ID');
console.log(lowestID);
const seatID = lodash_1.default.xor(lodash_1.default.map(ticketSeats, 'ID'), lodash_1.default.range(lodash_1.default.get(lowestID, 'ID', 0), lodash_1.default.get(highestID, 'ID', 0) + 1));
console.log(seatID);
