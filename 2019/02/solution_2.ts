import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const initialOperations: number[] = fileBuffer.toString().split(",").map(s => parseInt(s));

const getResult = (operations: number[]) => {
      const param1 = (pos) => operations[operations[pos + 1]];
      const param2 = (pos) => operations[operations[pos + 2]];
      const target = (pos) => operations[pos + 3];

      let position = 0;
      while (operations[position] !== 99) {
            const p1 = param1(position);
            const p2 = param2(position);
            const t = target(position);

            const op = operations[position];
            if (op === 1) {
                  operations[t] = p1 + p2;
            } else if (op === 2) {
                  operations[t] = p1 * p2;
            }
            position += 4;
      }

      return operations[0];
}

(() => {
      for (let noun = 1; noun < 100; noun++) {
            for (let verb = 1; verb < 100; verb++) {
                  const currentOperations = [...initialOperations];
                  currentOperations[1] = noun;
                  currentOperations[2] = verb;
                  const result = getResult(currentOperations);
                  if (result === 19690720) {
                        console.log(noun, verb);
                        console.log(100 * noun + verb);
                        return;
                  }
            }
      }
})();
