import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
let operations: number[] = fileBuffer.toString().split(",").map(s => parseInt(s));

const calcAmpResult = (setting: number, signal: number) => {
    let position = 0;

    const lastTwoNumbersOf = (num: number) => parseInt(num.toString().slice(-2));
    const firstThreeNumbersReverse = (num: number) => num.toString().padStart(5, '0').slice(0, 3).split('').reverse();

    let settingUsed = false;
    const results = [];
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
            operations[operations[position + 1]] = settingUsed ? signal : setting;
            settingUsed = true;

            position += 2;
        } else if (op === 4) {
            const p1 = operations[parameterPositions[0]];
            results.push(p1);

            position += 2;
        } else if (op === 5) {
            const p1 = operations[parameterPositions[0]];
            if (p1 !== 0) {
                position = operations[parameterPositions[1]];
            } else {
                position += 3;
            }
        } else if (op === 6) {
            const p1 = operations[parameterPositions[0]];
            if (p1 === 0) {
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
            console.log('err!');
            break;
        }
    }

    return results.pop();
}

let max = 0;
let maxVal;
permute([0, 1, 2, 3, 4]).forEach(settings => {
    let currentSignal = 0;
    settings.forEach(setting => {
        currentSignal = calcAmpResult(setting, currentSignal);
    });

    if(currentSignal > max) {
        max = currentSignal;
        maxVal = settings;
    }
});

console.log(max, maxVal);



function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

