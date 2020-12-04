import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const passports = _.split(input, '\n\n')
  .map((ps) => _.split(ps, /\s/))
  .map((ps) =>
    _.reduce(
      ps,
      (prev, curr) => {
        const [key, value] = _.split(curr, ':');
        return {
          ...prev,
          [key]: value,
        };
      },
      {},
    ),
  );

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const passportMissingFields = _.map(passports, (p) =>
  _.reject(requiredFields, (f) => _.includes(_.keys(p), f)),
);

const validPassports = _.filter(passportMissingFields, _.isEmpty);

console.log(validPassports.length);
