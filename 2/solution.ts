import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

interface Policy {
  min: number;
  max: number;
  char: string;
}

const data = _.split(input, '\n').map((row) => {
  const parts = _.split(row, ': ');

  const policyParts = /(\d+)-(\d+) (\w)/i.exec(parts[0]);
  const policy = {
    min: _.toInteger(_.get(policyParts, '1', 0)),
    max: _.toInteger(_.get(policyParts, '2', 0)),
    char: _.toString(_.get(policyParts, '3', '')),
  };

  const password = parts[1];
  return {
    policy,
    password,
  };
});

function checkValid1(policy: Policy, password: string) {
  return _.inRange(
    _.filter(password, (c) => c === policy.char).length,
    policy.min,
    policy.max + 1,
  );
}

const validList1 = _.filter(data, (p) => checkValid1(p.policy, p.password));

console.log(validList1.length);

function checkValid2(policy: Policy, password: string) {
  const lettersToCheck = _.at(password, [policy.min - 1, policy.max - 1]);
  const matches = _.filter(lettersToCheck, (c) => c === policy.char).length;
  return matches === 1;
}

const validList2 = _.filter(data, (p) => checkValid2(p.policy, p.password));

console.log(validList2.length);
