"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const input = fs_1.readFileSync(path_1.join(__dirname, 'input.txt'), 'utf-8');
const positions = lodash_1.default.chain(input)
    .split('\n')
    .flatMap((r, y) => lodash_1.default.split(r, '').map((c, x) => ({ x, y, state: c })))
    .value();
function* GameOfLife(positions, getNeighbors, limit) {
    let prev = positions;
    let curr = [];
    while (true) {
        curr = lodash_1.default.map(prev, (p) => {
            const neighbors = getNeighbors(prev, p);
            const occupied = lodash_1.default.filter(neighbors, { state: '#' });
            if (p.state === 'L' && occupied.length === 0) {
                return Object.assign(Object.assign({}, p), { state: '#' });
            }
            if (p.state === '#' && occupied.length >= limit) {
                return Object.assign(Object.assign({}, p), { state: 'L' });
            }
            return p;
        });
        if (lodash_1.default.isEqual(prev, curr))
            break;
        yield curr;
        prev = curr;
    }
    return;
}
function getAdjacent(positions, target) {
    const neighbors = lodash_1.default.filter(positions, (p) => lodash_1.default.inRange(p.x, target.x - 1, target.x + 2) &&
        lodash_1.default.inRange(p.y, target.y - 1, target.y + 2) &&
        !lodash_1.default.isEqual(target, p));
    return neighbors;
}
function prettyPrint(positions) {
    if (!positions)
        return;
    const byRow = lodash_1.default.groupBy(positions, 'y');
    const byColumns = lodash_1.default.map(byRow, (r) => lodash_1.default.map(r, 'state').join('')).join('\n');
    console.log(byColumns);
    const occupied = lodash_1.default.filter(positions, { state: '#' });
    console.log({ occupied: occupied.length });
}
const gameOfSeats = GameOfLife(positions, getAdjacent, 4);
// prettyPrint(gameOfSeats.next().value);
// for (const round of gameOfSeats) {
//   prettyPrint(round);
// }
function getVisible(positions, target) {
    const cardinals = [
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: 0, y: -1 },
        { x: -1, y: -1 },
        { x: -1, y: 0 },
    ];
    const visible = lodash_1.default.map(cardinals, (c) => {
        let nextCoord = {
            x: target.x + c.x,
            y: target.y + c.y,
        };
        let atCoord = lodash_1.default.find(positions, Object.assign({}, nextCoord));
        while (atCoord && atCoord.state === '.') {
            nextCoord = {
                x: nextCoord.x + c.x,
                y: nextCoord.y + c.y,
            };
            atCoord = lodash_1.default.find(positions, Object.assign({}, nextCoord));
        }
        return atCoord;
    });
    return lodash_1.default.compact(visible);
}
const gameOfLoS = GameOfLife(positions, getVisible, 5);
// prettyPrint(gameOfLoS.next().value);
for (const round of gameOfLoS) {
    prettyPrint(round);
}
