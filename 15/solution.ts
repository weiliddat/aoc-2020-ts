import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';
import { bench } from '../helpers/bench';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const starting: number[] = _.split(input, ',').map((v) => parseInt(v, 10));

console.log({ starting });

function memoryGameCount(starting: number[], end: number) {
  let list: number[] = _.clone(starting);

  let lastSpoken = list[list.length - 1];

  for (let i = 0; i < end - starting.length; i++) {
    let last1 = list.lastIndexOf(lastSpoken);
    if (last1 === -1) {
      list.push(0);
    } else {
      let last2 = list.lastIndexOf(lastSpoken, last1 - 1);
      if (last2 === -1) {
        list.push(0);
      } else {
        list.push(last1 - last2);
      }
    }
    lastSpoken = list[list.length - 1];
  }

  return { lastSpoken, list };
}

type Indices = [i1?: number, i2?: number];

interface Entries {
  [number: number]: Indices;
}

function memoryGameMemorize(starting: number[], end: number) {
  let list: Entries = {};
  // let list: Entries = _.fromPairs(
  //   _.range(0, end).map((n) => [n, [] as Indices]),
  // );

  _.each(starting, (num, i) => pushEntry(list, num, i));

  let lastSpoken: number = starting[starting.length - 1];

  for (let i = starting.length; i < end; i++) {
    let entry = list[lastSpoken];

    if (_.isNil(entry) || _.isNil(entry[0]) || _.isNil(entry[1])) {
      lastSpoken = 0;
    } else {
      lastSpoken = entry[0] - entry[1];
    }

    list = pushEntry(list, lastSpoken, i);
  }

  return { lastSpoken, list };
}

function pushEntry(entries: Entries, number: number, index: number) {
  entries[number] = cycle(entries[number], index);
  return entries;
}

function cycle(old: Indices, index: number): Indices {
  return !_.isNil(old) && !_.isNil(old[0]) ? [index, old[0]] : [index];
}

// bench(() => console.log(memoryGameCount(starting, 300000).lastSpoken));
bench(() => console.log(memoryGameMemorize(starting, 3000000).lastSpoken));
