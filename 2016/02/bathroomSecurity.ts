import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const commands = fileBuffer.toString().split('\n');

const keypad: Readonly<number[][]> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

type Position = [number, number];
interface Movements {
    [s: string]: (Position) => Position
}

const movements: Movements = {
    'L': ([x, y]: Position) => ([x == 0 ? x : x - 1, y]),
    'R': ([x, y]: Position) => ([x == 2 ? x : x + 1, y]),
    'U': ([x, y]: Position) => ([x, y == 0 ? y : y - 1]),
    'D': ([x, y]: Position) => ([x, y == 2 ? y : y + 1]),
}

let currentPos: Position = [1, 1]

const result = commands.map(val => {
    currentPos = val.split("").reduce((oldPos, currentCommand) => movements[currentCommand](oldPos), currentPos)
    return currentPos;
});
console.log(result.map(pos => keypad[pos[1]][pos[0]]));
