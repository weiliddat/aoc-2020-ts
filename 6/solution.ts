import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const answersByGroup = _.split(input, '\n\n').map((v) => {
  const memberAnswers = _.split(v, '\n').map((ans) => ({
    string: ans,
    list: _.split(ans, ''),
  }));

  const union = _.union(_.flatMap(memberAnswers, 'list'));

  const intersect = _.intersection(..._.map(memberAnswers, 'list'));

  return {
    memberAnswers,
    union,
    intersect,
    anyCount: union.length,
    everyCount: intersect.length,
  };
});

console.dir(answersByGroup, { depth: null });

const sumOfUniqueAnswers = _.sumBy(answersByGroup, 'anyCount');

console.log(sumOfUniqueAnswers);

const sumOfIntersectingAnswers = _.sumBy(answersByGroup, 'everyCount');

console.log(sumOfIntersectingAnswers);
