import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const answersByGroup = _.split(input, '\n\n').map((v) => {
  const memberAnswers = _.split(v, '\n').map((ans) => ({
    string: ans,
    list: _.split(ans, ''),
  }));

  const deduplicated = _.union(_.flatMap(memberAnswers, 'list'));

  return {
    memberAnswers,
    deduplicated,
    count: deduplicated.length,
  };
});

console.dir(answersByGroup, { depth: null });

const sumOfUniqueAnswers = _.sumBy(answersByGroup, 'count');

console.log(sumOfUniqueAnswers);
