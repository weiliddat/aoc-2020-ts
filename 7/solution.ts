import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

type ContainRule = Record<string, number>;

interface BagRule {
  bag: string;
  canContain: ContainRule;
}

const bagRules: BagRule[] = _.chain(input)
  .split('\n')
  .map((ruleString) => {
    const bagColor = _.get(/^(.+?) bags/i.exec(ruleString), '1') as string;
    const containColorString = _.get(/contain (.+?)\.$/i.exec(ruleString), '1');
    const containColorRule = _.chain(containColorString)
      .split(', ')
      .map((numColorString) => {
        const numColorSearch = /^(.+?) (.+) bag/i.exec(numColorString);
        const numColorResults = _.at(numColorSearch, [2, 1]);
        if (numColorResults[1] !== 'no') {
          return numColorResults;
        }
      })
      .compact()
      .fromPairs()
      .mapValues((v) => parseInt(v))
      .value();

    return {
      bag: bagColor,
      canContain: containColorRule,
    };
  })
  .value();

function getAllContains(color: string) {
  let acc: ContainRule = {};

  let nextSearch = [color];

  while (!_.isEmpty(nextSearch)) {
    const matches = _.map(nextSearch, (c) => _.find(bagRules, { bag: c }));

    const contains: ContainRule[] = _.compact(
      _.map(matches, 'canContain').filter((v) => !_.isEmpty(v)),
    );

    _.assign(acc, ...contains);

    nextSearch = _.uniq(_.compact(_.flatMap(contains, _.keys)));
  }

  return acc;
}

const bagRulesFlat = _.map(bagRules, (rule) => ({
  ...rule,
  canContain: getAllContains(rule.bag),
}));

const canHasShinyGold = _.filter(bagRulesFlat, (r) =>
  _.has(r.canContain, 'shiny gold'),
);

console.log(canHasShinyGold.length);

function countBags(rule: BagRule) {
  let acc: ContainRule[] = [rule.canContain];

  let nextSearch: BagRule[] = [rule];

  while (!_.isEmpty(nextSearch)) {
    const matches = _.chain(nextSearch)
      .map('canContain')
      .flatMap((c: ContainRule) =>
        _.flatMap(c, (num, bag): BagRule[] => {
          const found = _.find(bagRules, { bag });
          if (found) {
            return Array(num).fill(found);
          } else {
            return [];
          }
        }),
      )
      .value();

    acc.push(..._.map(matches, 'canContain'));
    nextSearch = matches;
  }

  return _.chain(acc)
    .map((c) => _.sum(_.values(c)))
    .sum()
    .value();
}

const shinyGoldBag = _.find(bagRules, { bag: 'shiny gold' }) as BagRule;

console.log(countBags(shinyGoldBag));
