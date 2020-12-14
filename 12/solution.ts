import { readFileSync } from 'fs';
import { join } from 'path';
import _ from 'lodash';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

enum Heading {
  N,
  E,
  S,
  W,
}

type Action = 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F';

type Coord = [x: number, y: number];

const add = (a: Coord, b: Coord): Coord => [a[0] + b[0], a[1] + b[1]];
const multiply = (a: Coord, b: number): Coord => [a[0] * b, a[1] * b];
const rotate = (a: Coord, turns: number): Coord => {
  const [x, y] = a;

  switch (turns) {
    case -2:
    case 2:
      return [-x, -y];
    case -1:
    case 3:
      return [-y, x];
    case 1:
    case -3:
      return [y, -x];
    default:
      return a;
  }
};

class Ship {
  position: Coord;
  direction: Heading;
  waypoint: Coord;

  constructor(
    position: Coord = [0, 0],
    direction: Heading = Heading.E,
    waypoint: Coord = [10, 1],
  ) {
    this.position = position;
    this.direction = direction;
    this.waypoint = waypoint;
  }

  useWaypoint(instruction: string): void {
    const action = instruction.slice(0, 1) as Action;
    const value = parseInt(instruction.slice(1), 10);

    switch (action) {
      case 'N':
        this.waypoint = add(this.waypoint, [0, value]);
        break;
      case 'S':
        this.waypoint = add(this.waypoint, [0, -value]);
        break;
      case 'E':
        this.waypoint = add(this.waypoint, [value, 0]);
        break;
      case 'W':
        this.waypoint = add(this.waypoint, [-value, 0]);
        break;
      case 'L':
        this.waypoint = rotate(this.waypoint, -value / 90);
        break;
      case 'R':
        this.waypoint = rotate(this.waypoint, value / 90);
        break;
      case 'F':
        this.position = add(this.position, multiply(this.waypoint, value));
        break;
    }
  }

  navigate(instruction: string): void {
    const action = instruction.slice(0, 1) as Action;
    const value = parseInt(instruction.slice(1), 10);

    switch (action) {
      case 'N':
        this.position = add(this.position, [0, value]);
        break;
      case 'S':
        this.position = add(this.position, [0, -value]);
        break;
      case 'E':
        this.position = add(this.position, [value, 0]);
        break;
      case 'W':
        this.position = add(this.position, [-value, 0]);
        break;
      case 'L':
        this.direction = (4 + this.direction - value / 90) % 4;
        break;
      case 'R':
        this.direction = (this.direction + value / 90) % 4;
        break;
      case 'F':
        this.navigate(`${Heading[this.direction]}${value}`);
        break;
    }
  }
}

const manhattan = new Ship();

const instructions = _.split(input, '\n');

_.each(instructions, (i) => manhattan.navigate(i));

console.log(manhattan.position);

console.log(_.sumBy(manhattan.position, Math.abs));

const manhattan2 = new Ship();

_.each(instructions, (i) => manhattan2.useWaypoint(i));

console.log(manhattan2.position);

console.log(_.sumBy(manhattan2.position, Math.abs));
