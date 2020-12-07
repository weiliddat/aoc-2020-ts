import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const bagRules = _.chain(input)
  .split('\n')
  .value();

console.log(bagRules);
