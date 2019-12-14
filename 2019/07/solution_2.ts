import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
let operations: number[] = fileBuffer.toString().split(",").map(s => parseInt(s));

class IntComputer {
    private settingUsed = false;
    private op: number;
    private operations: number[];
    private position: number = 0;
    private parameterPositions: number[];
    constructor(private setting: number, operations: number[]) {
        this.operations = operations;
    }

    getNextOutput(currentInput: number) {
        let currentInputUsed = false;

        const lastTwoNumbersOf = (num: number) => parseInt(num.toString().slice(-2));
        const firstThreeNumbersReverse = (num: number) => num.toString().padStart(5, '0').slice(0, 3).split('').reverse();

        const results = [];
        for (this.op = lastTwoNumbersOf(this.operations[this.position]); this.op !== 99; this.op = lastTwoNumbersOf(this.operations[this.position])) {
            const parameterModes = firstThreeNumbersReverse(this.operations[this.position]).map(v => v === '1');
            const getParameterPos = (position: number, immediate: boolean) => immediate ? position : this.operations[position];
            const parameterPositions = parameterModes.map((isImmediate, i) => getParameterPos(this.position + i + 1, isImmediate));

            // console.log(this.op);

            if (this.op === 1) {
                this.operations[this.operations[this.position + 3]] = this.operations[parameterPositions[0]] + this.operations[parameterPositions[1]];

                this.position += 4;
            } else if (this.op === 2) {
                this.operations[this.operations[this.position + 3]] = this.operations[parameterPositions[0]] * this.operations[parameterPositions[1]];;

                this.position += 4;
            } else if (this.op === 3) {
                if (currentInputUsed) {
                    console.log('error needs input');
                }

                if (!this.settingUsed) {
                    this.operations[this.operations[this.position + 1]] = this.setting;
                    this.settingUsed = true;
                }

                else {
                    // console.log(currentInput, currentInputUsed, 'using current input');

                    this.operations[this.operations[this.position + 1]] = currentInput;
                    currentInputUsed = true;
                }

                this.position += 2;
            } else if (this.op === 4) {
                const p1 = this.operations[parameterPositions[0]];
                this.position += 2;

                return p1;
            } else if (this.op === 5) {
                const p1 = this.operations[parameterPositions[0]];
                if (p1 !== 0) {
                    this.position = this.operations[parameterPositions[1]];
                } else {
                    this.position += 3;
                }
            } else if (this.op === 6) {
                const p1 = this.operations[parameterPositions[0]];
                if (p1 === 0) {
                    this.position = this.operations[parameterPositions[1]];
                } else {
                    this.position += 3;
                }
            } else if (this.op === 7) {
                const p1 = this.operations[parameterPositions[0]];
                const p2 = this.operations[parameterPositions[1]];

                this.operations[this.operations[this.position + 3]] = p1 < p2 ? 1 : 0;

                this.position += 4;
            } else if (this.op === 8) {
                const p1 = this.operations[parameterPositions[0]];
                const p2 = this.operations[parameterPositions[1]];

                this.operations[this.operations[this.position + 3]] = p1 === p2 ? 1 : 0;

                this.position += 4;
            } else {
                console.log('err!', this.op);
                break;
            }
        }

        return null;
    }
}

let max = 0;
let maxVal;
permute([5, 6, 7, 8, 9]).forEach(settings => {
    // const settings = [9,8,7,6,5];
    const a = new IntComputer(settings[0], operations);
    const b = new IntComputer(settings[1], operations);
    const c = new IntComputer(settings[2], operations);
    const d = new IntComputer(settings[3], operations);
    const e = new IntComputer(settings[4], operations);
    const computers = [a, b, c, d, e];

    let hasSignal = false;
    let currentSignal = 0;
    while (!hasSignal) {
        for (const cmp of computers) {
            currentSignal = cmp.getNextOutput(currentSignal);
            console.log(currentSignal);

        }
        console.log('e',currentSignal);

        if (currentSignal === null) {
            hasSignal = true;
            break;
        }

        if (currentSignal > max) {
            max = currentSignal;
            maxVal = settings;
        }
    }
    console.log(max, maxVal);
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

