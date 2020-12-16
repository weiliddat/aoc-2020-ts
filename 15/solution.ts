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

interface Entries {
  [number: number]: number;
}

/**
 * pre allocate
 * use 1-based index to allocate 0 as default
 */
function memoryGameMemorize(starting: number[], end: number) {
  const max = _.max([...starting, end]) || 0;
  let list: Entries = _.fromPairs(_.range(0, max + 1).map((n) => [n, 0]));

  _.each(starting.slice(0, -1), (num, i) => (list[num] = i + 1));

  let spoken: number = starting[starting.length - 1];

  for (let i = starting.length; i < end; i++) {
    let prevIndex = list[spoken];

    list[spoken] = i;

    if (prevIndex) {
      spoken = i - prevIndex;
    } else {
      spoken = 0;
    }
  }

  return { spoken, list };
}

// bench(() => console.log(memoryGameCount(starting, 30000000).lastSpoken));
bench(() => console.log(memoryGameMemorize(starting, 30000000).spoken));
