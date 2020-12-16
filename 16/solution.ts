import { readFileSync } from 'fs';
import { join } from 'path';
import _, { sortBy } from 'lodash';
import { bench } from '../helpers/bench';

const rangesInput = readFileSync(join(__dirname, 'ranges.txt'), 'utf-8');
const ticketInput = readFileSync(join(__dirname, 'ticket.txt'), 'utf-8');
const nearbyInput = readFileSync(join(__dirname, 'nearby.txt'), 'utf-8');

const ranges = _.chain(rangesInput)
  .split('\n')
  .map((row) => {
    const label = _.get(/^(.+?)\:/i.exec(row), 1, 'default');
    const ranges = _.slice(/^.+?\: (.+?) or (.+?)$/i.exec(row), 1, 3).map((r) =>
      _.split(r, '-').map((v) => parseInt(v, 10)),
    );

    return [label, ranges];
  })
  .fromPairs()
  .value() as Record<string, number[][]>;

const rangeChecker = _.mapValues(ranges, (rs) => (t: number) =>
  _.some(rs, (r) => _.inRange(t, r[0], r[1] + 1)),
);

const validInAnyRange = (v: number) => _.some(rangeChecker, (f) => f(v));
const validInAllRange = (v: number) => _.every(rangeChecker, (f) => f(v));

const ticket = _.split(ticketInput, ',').map((v) => parseInt(v, 10));

const nearby = _.split(nearbyInput, '\n').map((row) =>
  _.split(row, ',').map((v) => parseInt(v, 10)),
);

const invalidValues = _.flatMap(nearby, (t) =>
  _.reject(t, (v) => validInAnyRange(v)),
);

const validTickets = _.filter(nearby, (t) =>
  _.every(t, (v) => validInAnyRange(v)),
);

const findLabels = (vs: number[]) =>
  _.keys(_.pickBy(rangeChecker, (f) => _.every(vs, f)));

const ticketsToCheck = [ticket, ...validTickets];

function findTicketLabels(tickets: number[][]) {
  let ticketPossibleLabels = _.chain(tickets)
    .thru((ts) => _.zip(...ts))
    .map((vs, index) => ({ index, labels: findLabels(vs as number[]) }))
    .value();

  const ticketLength = ticketPossibleLabels.length;

  let ticketLabels = [];

  while (ticketLabels.length < ticketLength) {
    const onlyPossible = _.find(
      ticketPossibleLabels,
      (v) => v.labels.length === 1,
    );

    if (!onlyPossible) {
      console.error('boom');
      continue;
    }

    const onlyPossibleIndex = onlyPossible.index;
    const onlyPossibleLabel = onlyPossible.labels[0];

    ticketLabels.push({
      index: onlyPossibleIndex,
      label: onlyPossibleLabel,
    });

    ticketPossibleLabels = _.reject(ticketPossibleLabels, {
      index: onlyPossibleIndex,
    });

    ticketPossibleLabels = _.map(ticketPossibleLabels, (v) => {
      const newLabels = _.reject(v.labels, (l) => l === onlyPossibleLabel);
      return {
        index: v.index,
        labels: newLabels,
      };
    });
  }

  return ticketLabels;
}

const ticketLabels = _.chain(findTicketLabels(ticketsToCheck))
  .sortBy('index')
  .map('label')
  .value();

console.log(ticketLabels);

const ticketWithLabels = _.fromPairs(_.zip(ticketLabels, ticket));

console.log(ticketWithLabels);

_.chain(ticketWithLabels)
  .pickBy((v, k) => /^departure/i.test(k))
  .values()
  .reduce(_.multiply)
  .tap(console.log)
  .value();
