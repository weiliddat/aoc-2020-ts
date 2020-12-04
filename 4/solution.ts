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

const fieldsWithValidator = [
  {
    field: 'byr',
    validator: (v: string) =>
      /^\d{4}$/i.test(v) && _.inRange(parseInt(v, 10), 1920, 2003),
  },
  {
    field: 'iyr',
    validator: (v: string) =>
      /^\d{4}$/i.test(v) && _.inRange(parseInt(v, 10), 2010, 2021),
  },
  {
    field: 'eyr',
    validator: (v: string) =>
      /^\d{4}$/i.test(v) && _.inRange(parseInt(v, 10), 2020, 2031),
  },
  {
    field: 'hgt',
    validator: (v: string) =>
      /^\d+cm$/i.test(v)
        ? _.inRange(parseInt(_.get(/^(\d+)cm$/i.exec(v), 0, ''), 10), 150, 194)
        : /^\d+in$/i.test(v)
        ? _.inRange(parseInt(_.get(/^(\d+)in$/i.exec(v), 0, ''), 10), 59, 77)
        : false,
  },
  {
    field: 'hcl',
    validator: (v: string) => /^#[0-9a-f]{6}$/i.test(v),
  },
  {
    field: 'ecl',
    validator: (v: string) =>
      _.includes(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'], v),
  },
  {
    field: 'pid',
    validator: (v: string) => /^\d{9}$/i.test(v),
  },
];

const passportMissingFields = _.map(passports, (p) =>
  _.reject(requiredFields, (f) => _.includes(_.keys(p), f)),
);

const passportsWithRequiredFields = _.filter(passportMissingFields, _.isEmpty);

console.log(passportsWithRequiredFields.length);

const validPassports = _.filter(passports, (p) =>
  _.every(
    fieldsWithValidator,
    (f) => _.has(p, f.field) && f.validator(_.get(p, f.field)),
  ),
);

console.log(validPassports.length);
