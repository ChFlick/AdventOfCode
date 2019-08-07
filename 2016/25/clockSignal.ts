import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const instructions: string[] = fileBuffer.toString().split("\n");

const registers = {
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0
};

const getFirst20ForRegisters = (registers): number[] => {
    let ip = 0;
    const outNums: number[] = [];
    while (ip < instructions.length) {
        const curr = instructions[ip];
        const values = curr.split(" ");

        if (curr.startsWith("cpy")) {
            const param1 = values[1];
            const val = isNaN(parseInt(param1)) ? registers[param1] : parseInt(param1);
            const targetRegister = values[2];
            if (isNaN(parseInt(targetRegister))) {
                registers[targetRegister] = val;
            }
        } else if (curr.startsWith("inc")) {
            const targetRegister = values[1];
            registers[targetRegister] = registers[targetRegister] + 1;
        } else if (curr.startsWith("dec")) {
            const targetRegister = values[1];
            registers[targetRegister] = registers[targetRegister] - 1;
        } else if (curr.startsWith("jnz")) {
            const param1 = values[1];
            const jnzVal = isNaN(parseInt(param1)) ? registers[param1] : parseInt(param1);
            if (jnzVal !== 0) {
                const param2 = values[2];
                const jumpValue = isNaN(parseInt(param2)) ? registers[param2] : parseInt(param2);
                ip += jumpValue;
                continue;
            }
        } else if (curr.startsWith("tgl")) {
            const targetRegister = values[1];
            const instructionToToggle = registers[targetRegister] + ip;
            if (instructionToToggle >= instructions.length) { ip++; continue; }

            const affectedInstruction = instructions[instructionToToggle];
            const split = affectedInstruction.split(" ");

            let newInstruction: string;
            if (split.length === 2 && split[0] === "inc") {
                newInstruction = "dec " + split[1];
            } else if (split.length === 2) {
                newInstruction = "inc " + split[1];
            } else if (split.length === 3 && split[0] === "jnz") {
                newInstruction = "cpy " + split[1] + " " + split[2];
            } else if (split.length === 3) {
                newInstruction = "jnz " + split[1] + " " + split[2];
            }

            instructions[instructionToToggle] = newInstruction;
        } else if (curr.startsWith("out")) {
            const param1 = values[1];
            const val = isNaN(parseInt(param1)) ? registers[param1] : parseInt(param1);

            outNums.push(val);
            if (outNums.length === 20) {
                return outNums;
            }
        }

        ip++;
    }
}

let a = 0;
while(!(getFirst20ForRegisters(registers).every((n, i) => (i % 2 === 0) ? n === 0 : n === 1))) {
    registers["a"] = a++;
    // console.log(getFirst20ForRegisters(registers).every((n, i) => (i % 2 === 0) ? n === 0 : n === 1));
}

console.log(a - 1);
