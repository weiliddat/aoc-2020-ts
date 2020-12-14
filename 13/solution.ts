import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const data = _.split(input, '\n');
const timestamp = parseInt(data[0], 10);
const buses = data[1]
  .split(',')
  .filter((b) => b !== 'x')
  .map((b) => parseInt(b, 10));

// const nearTimestamps = _.map(buses, (b) => {
//   const r = timestamp % b;
//   return {
//     bus: b,
//     nearBefore: timestamp - r,
//     nearAfter: timestamp + b - r,
//   };
// });

// console.log(nearTimestamps);

// const nearest = _.minBy(nearTimestamps, 'nearAfter');

// if (nearest) {
//   console.log((nearest.nearAfter - timestamp) * nearest.bus);
// }

interface Constraint {
  b: number;
  i: number;
  // r: number;
}

const timestampConstraints = _.split(data[1], ',')
  .map((b, i) => ({ b, i }))
  .filter((v) => v.b !== 'x')
  .map((v) => ({ ...v, b: parseInt(v.b, 10) }));
// .map((v) => ({ ...v, r: v.i === 0 ? v.i : v.b - v.i }));

const fits = (cs: Constraint[], t: number) =>
  _.every(cs, (c) => (t + c.i) % c.b === 0);

function findConstraints(constraints: Constraint[]) {
  const fitsConstraint = _.partial(fits, constraints);
  const first = _.head(constraints);
  if (!first) return;

  let t = 0;
  let f = first.b;
  while (!fitsConstraint(t) && t < Number.MAX_SAFE_INTEGER) {
    // console.log(t);
    t += f;
  }
  return t;
}

function factorConstraints(constraints: Constraint[]) {
  const first = _.head(constraints);
  if (!first) return;

  let f = first.b;
  let t = f;
  let a = [0];

  for (let i = 0; i < constraints.length; i++) {
    const cs = _.slice(constraints, 0, i + 1);

    while (!fits(cs, t)) {
      t += f;
    }

    a.push(t);

    f = _.last(a) || f;

    console.log({ t });
    console.log({ a });
    console.log({ f });
  }

  return t;
}

console.log(timestampConstraints);
// console.log(findConstraints(timestampConstraints));
console.log(factorConstraints(timestampConstraints));
