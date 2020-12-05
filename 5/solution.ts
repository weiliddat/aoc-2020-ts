import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const planeRows = 128;
const planeCols = 8;

const boardingTickets = _.split(input, '\n');

const ticketSeats = _.map(boardingTickets, (seatInstruction) => {
  const rowInstruction = _.slice(seatInstruction, 0, 7);
  const colInstruction = _.slice(seatInstruction, 7, 11);

  const row = _.reduce(
    rowInstruction,
    (prev, curr) => {
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
    },
    { start: 0, len: planeRows },
  );

  const col = _.reduce(
    colInstruction,
    (prev, curr) => {
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
    },
    { start: 0, len: planeCols },
  );

  return {
    row,
    col,
    ID: row.start * 8 + col.start,
  };
});

console.log(ticketSeats);

const highestID = _.maxBy(ticketSeats, 'ID');

console.log(highestID);
