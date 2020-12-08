import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

type Operation = 'nop' | 'acc' | 'jmp';

interface Instruction {
  line: number;
  op: Operation;
  arg: number;
}

const bootCode = _.split(input, '\n').map(
  (instructionString, line): Instruction => {
    const split = _.split(instructionString, ' ');
    const op = split[0] as Operation;
    const arg = parseInt(split[1]);

    return {
      line,
      op,
      arg,
    };
  },
);

function run(code: Instruction[]) {
  let acc = 0;
  let ran: Instruction[] = [];
  let curr: Instruction = _.head(code) as Instruction;

  while (curr && !_.find(ran, { line: curr.line })) {
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

const possibleBootCodes: Instruction[][] = _.chain(bootCode)
  .map((ins) => {
    if (ins.op === 'jmp') {
      return {
        ...ins,
        op: 'nop',
      };
    }
    if (ins.op === 'nop') {
      return {
        ...ins,
        op: 'jmp',
      };
    }
  })
  .compact()
  .map((ins) => _.set(_.cloneDeep(bootCode), ins.line, ins))
  .value();

const correct = _.map(possibleBootCodes, run).filter(
  (result) => _.last(result.ran)?.line === bootCode.length - 1,
);

console.log(correct);
