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

function findConstraints(
  constraints: Constraint[],
  start?: number,
  factor?: number,
) {
  const fitsConstraint = _.partial(fits, constraints);
  const first = _.head(constraints);
  if (!first) return 0;

  let t = start ?? 0;
  let f = factor ?? first.b;
  t += f;
  while (!fitsConstraint(t) && t < Number.MAX_SAFE_INTEGER) {
    t += f;
  }
  return t;
}

function factorConstraints(constraints: Constraint[]) {
  let prev = constraints[0].b;
  let curr = 0;
  let next = 0;
  let factor = undefined;

  for (let i = 1; i <= constraints.length; i++) {
    const slice = _.slice(constraints, 0, i);

    curr = findConstraints(slice, curr, factor);
    if (i === constraints.length) break;
    next = findConstraints(slice, curr, factor);
    factor = next - curr;
    prev = curr;
  }

  return curr;
}

console.log(timestampConstraints);
bench(() => console.log(factorConstraints(timestampConstraints)));
bench(() => console.log(findConstraints(timestampConstraints)));

function bench(func: any): void {
  const start = new Date().valueOf();
  func();
  const end = new Date().valueOf();
  console.log(end - start);
}
