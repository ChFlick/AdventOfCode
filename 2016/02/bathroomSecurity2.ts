import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const commands = fileBuffer.toString().split('\n');

const keypad: Readonly<number[][]> = [[0,0,0,0,0,0,0],
                                      [0,0,0,1,0,0,0], 
                                      [0,0,2,3,4,0,0],
                                      [0,5,6,7,8,9,0],
                                      [0,0,10,11,12,0,0],
                                      [0,0,0,13,0,0,0],
                                      [0,0,0,0,0,0,0]];
// 10 = A, 11 = B, 12 = C, 13 = D

type Position = [number, number];
interface Movements {
    [s: string]: (Position) => Position
}

const movements: Movements = {
    'L': ([x, y]: Position) => keypad[y][x - 1] == 0 ? [x, y] : [x - 1, y],
    'R': ([x, y]: Position) => keypad[y][x + 1] == 0 ? [x, y] : [x + 1, y],
    'U': ([x, y]: Position) => keypad[y - 1][x] == 0 ? [x, y] : [x, y - 1],
    'D': ([x, y]: Position) => keypad[y + 1][x] == 0 ? [x, y] : [x, y + 1],
}

let currentPos: Position = [1, 3]

const result = commands.map(val => {
    currentPos = val.split("").reduce((oldPos, currentCommand) => movements[currentCommand](oldPos), currentPos)
    return currentPos;
});
console.log(result.map(pos => keypad[pos[1]][pos[0]]));
