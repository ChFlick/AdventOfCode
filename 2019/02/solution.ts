import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
let operations: number[] = fileBuffer.toString().split(",").map(s => parseInt(s));
operations[1] = 12;
operations[2] = 2;

const param1 = (pos) => operations[operations[pos + 1]];
const param2 = (pos) => operations[operations[pos + 2]];
const target = (pos) => operations[pos + 3];

let position = 0;
while (operations[position] !== 99) {
      const op = operations[position];
      if (op === 1) {
            const processedVal = param1(position) + param2(position);
            operations[target(position)] = processedVal;
      } else if (op === 2) {
            const processedVal = param1(position) * param2(position);
            operations[target(position)] = processedVal;
      }
      position += 4;
}

console.log(operations);
console.log(operations[0]);
