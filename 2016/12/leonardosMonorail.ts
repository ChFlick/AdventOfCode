import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const instructions: string[] = fileBuffer.toString().split("\n");

// V1
// const registers = {
//     "a": 0,
//     "b": 0,
//     "c": 0,
//     "d": 0
// };

const registers = {
    "a": 0,
    "b": 0,
    "c": 1,
    "d": 0
};

let ip = 0;
while(ip < instructions.length) {
    const curr = instructions[ip];
    const values = curr.split(" ");
    
    if(curr.startsWith("cpy")) {
        const param1 = values[1];
        const val = isNaN(parseInt(param1)) ? registers[param1] : parseInt(param1);
        const targetRegister = values[2];
        registers[targetRegister] = val;
    } else if(curr.startsWith("inc")) {
        const targetRegister = values[1];
        registers[targetRegister] = registers[targetRegister] + 1;
    } else if(curr.startsWith("dec")) {
        const targetRegister = values[1];
        registers[targetRegister] = registers[targetRegister] - 1;
    } else if(curr.startsWith("jnz")) {
        const targetRegister = values[1];
        if(registers[targetRegister] !== 0) {
            const jumpValue = parseInt(values[2]);
            ip += jumpValue;
            continue;
        }
    }

    ip++;
}

console.log(registers);
