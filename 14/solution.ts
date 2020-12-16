import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

interface State {
  currentMask: string;
  memory: Record<string, number>;
}

interface MaskInstruction {
  type: 'mask';
  value: 'string';
}

interface MemInstruction {
  type: 'mem';
  address: number;
  value: number;
}

type Instruction = MaskInstruction | MemInstruction;

const instructions: Instruction[] = _.chain(input)
  .split('\n')
  .map((line) => {
    const isMask = /^mask/i.test(line);

    if (isMask) {
      const valueResult = /^mask \= (.+)$/i.exec(line);
      const value = valueResult ? valueResult[1] : '';
      return {
        type: 'mask',
        value: value,
      } as MaskInstruction;
    }

    const valueResult = /^mem\[(.+)\] \= (.+)$/i.exec(line);
    const address = valueResult ? valueResult[1] : '';
    const value = valueResult ? valueResult[2] : '';

    return {
      type: 'mem',
      address: parseInt(address, 10),
      value: parseInt(value, 10),
    } as MemInstruction;
  })
  .value();

function dec2Bin(dec: number): string {
  return _.padStart(dec.toString(2), 36, '0');
}

function bin2Dec(bin: string): number {
  return parseInt(bin, 2);
}

function applyMask(mask: string, dec: number) {
  const bin = dec2Bin(dec);
  const masked = _.map(bin, (char, i) =>
    mask[i] === 'X' ? char : mask[i],
  ).join('');
  const value = bin2Dec(masked);
  return value;
}

const memoryAfterMask = _.reduce(
  instructions,
  (prev, curr) => {
    if (curr.type === 'mask') {
      prev.currentMask = curr.value;
    }

    if (curr.type === 'mem') {
      prev.memory[curr.address] = applyMask(prev.currentMask, curr.value);
    }

    return prev;
  },
  {
    currentMask: '',
    memory: {},
  } as State,
);

// console.log(memoryAfterMask);

console.log(_.sum(_.values(memoryAfterMask.memory)));

function applyMemoryMask(mask: string, address: number) {
  const bin = dec2Bin(address);

  const masked = _.reduce(
    mask,
    (addresses, char, i) => {
      if (mask[i] === '1') {
        addresses = _.map(addresses, (a) => replaceStrAt(a, i, char));
      }

      if (mask[i] === 'X') {
        addresses = _.flatMap(addresses, (a) => [
          replaceStrAt(a, i, '0'),
          replaceStrAt(a, i, '1'),
        ]);
      }

      return addresses;
    },
    [bin] as string[],
  );

  return _.map(masked, (m) => bin2Dec(m));
}

function replaceStrAt(str: string, at: number, char: string) {
  if (at >= str.length) return str;
  return str.slice(0, at) + char + str.slice(at + 1);
}

const memoryAfterMemoryMask = _.reduce(
  instructions,
  (prev, curr) => {
    if (curr.type === 'mask') {
      prev.currentMask = curr.value;
    }

    if (curr.type === 'mem') {
      const addresses = applyMemoryMask(prev.currentMask, curr.address);
      _.each(addresses, (a) => (prev.memory[a] = curr.value));
    }

    return prev;
  },
  {
    currentMask: '',
    memory: {},
  } as State,
);

// console.log(memoryAfterMemoryMask.memory);

console.log(_.sum(_.values(memoryAfterMemoryMask.memory)));
