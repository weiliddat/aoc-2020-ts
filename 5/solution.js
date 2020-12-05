"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var lodash_1 = __importDefault(require("lodash"));
var input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
var planeRows = 128;
var planeCols = 8;
var boardingTickets = lodash_1.default.split(input, '\n');
var ticketSeats = lodash_1.default.map(boardingTickets, function (seatInstruction) {
    var rowInstruction = lodash_1.default.slice(seatInstruction, 0, 7);
    var colInstruction = lodash_1.default.slice(seatInstruction, 7, 11);
    var row = lodash_1.default.reduce(rowInstruction, function (prev, curr) {
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
    var col = lodash_1.default.reduce(colInstruction, function (prev, curr) {
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
        row: row,
        col: col,
        ID: row.start * 8 + col.start,
    };
});
console.log(ticketSeats);
var highestID = lodash_1.default.maxBy(ticketSeats, 'ID');
console.log(highestID);
var lowestID = lodash_1.default.minBy(ticketSeats, 'ID');
console.log(lowestID);
var seatID = lodash_1.default.xor(lodash_1.default.map(ticketSeats, 'ID'), lodash_1.default.range(lodash_1.default.get(lowestID, 'ID', 0), lodash_1.default.get(highestID, 'ID', 0) + 1));
console.log(seatID);
