import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';
import { bench } from '../helpers/bench';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

type Inactive = '.' | undefined;
type Active = '#';
type State = Inactive | Active;
type CoordState = { x: number; y: number; z: number; state: State };
type CubeState = CoordState[];

const startState: CubeState = _.chain(input)
  .split('\n')
  .flatMap((row, y) =>
    _.split(row, '').map((state, x) => ({ x, y, z: 0, state } as CoordState)),
  )
  .value();

function* GameOfLife(start: CubeState) {
  let state = _.cloneDeep(start);

  while (true) {
    state = nextState(state);
    yield state;
  }
}

function nextState(state: CubeState): CubeState {

}

function expandState(state: CubeState): CubeState {
  
  return _.flatMap(
    state,
    (s) => 
  )
}
