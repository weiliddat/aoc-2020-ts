import { readFileSync } from 'fs';
import _ from 'lodash';

const input = readFileSync('2/input.txt', 'utf-8');

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

function checkValid(policy: Policy, password: string) {
  return _.inRange(
    _.filter(password, (c) => c === policy.char).length,
    policy.min,
    policy.max + 1,
  );
}

const numOfValidPasswords = _.filter(data, ({ policy, password }) =>
  checkValid(policy, password),
).length;

console.log(numOfValidPasswords);
