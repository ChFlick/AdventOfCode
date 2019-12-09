import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
let operations: number[] = fileBuffer.toString().split(",").map(s => parseInt(s));

const input = 5;

let position = 0;

const lastTwoNumbersOf = (num: number) => parseInt(num.toString().slice(-2));
const firstThreeNumbersReverse = (num: number) => num.toString().padStart(5, '0').slice(0, 3).split('').reverse();

for (let op = lastTwoNumbersOf(operations[position]); op !== 99; op = lastTwoNumbersOf(operations[position])) {
    const parameterModes = firstThreeNumbersReverse(operations[position]).map(v => v === '1');
    const getParameterPos = (position: number, immediate: boolean) => immediate ? position : operations[position];
    const parameterPositions = parameterModes.map((isImmediate, i) => getParameterPos(position + i + 1, isImmediate));

    if (op === 1) {
        operations[operations[position + 3]] = operations[parameterPositions[0]] + operations[parameterPositions[1]];

        position += 4;
    } else if (op === 2) {
        operations[operations[position + 3]] = operations[parameterPositions[0]] * operations[parameterPositions[1]];;

        position += 4;
    } else if (op === 3) {
        operations[operations[position + 1]] = input;

        position += 2;
    } else if (op === 4) {
        const p1 = operations[parameterPositions[0]];
        console.log(p1);

        position += 2;
    } else if (op === 5) {
        const p1 = operations[parameterPositions[0]];
        if(p1 !== 0) {
            position = operations[parameterPositions[1]];
        } else {
            position += 3;
        }
    } else if (op === 6) {
        const p1 = operations[parameterPositions[0]];
        if(p1 === 0) {
            position = operations[parameterPositions[1]];
        } else {
            position += 3;
        }
    } else if (op === 7) {
        const p1 = operations[parameterPositions[0]];
        const p2 = operations[parameterPositions[1]];

        operations[operations[position + 3]] = p1 < p2 ? 1 : 0;

        position += 4;
    } else if (op === 8) {
        const p1 = operations[parameterPositions[0]];
        const p2 = operations[parameterPositions[1]];

        operations[operations[position + 3]] = p1 === p2 ? 1 : 0;

        position += 4;
    } else {
        console.log('err');
        break;
    }
}

console.log(operations);
console.log(operations[0]);
