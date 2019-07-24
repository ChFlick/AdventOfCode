import * as fs from 'fs';
import * as path from 'path';

const swapAt = (str: string, x: number, y: number) => {
    const temp = str.split("");
    const xChar = temp[x];
    temp[x] = temp[y];
    temp[y] = xChar;

    return temp.join("");
}

const swapLetters = (str: string, x: string, y: string) => swapAt(str, str.indexOf(x), str.indexOf(y));

const reverse = (str: string, from: number, to: number) =>
    str.substr(0, from) + str.substring(from, to + 1).split("").reverse().join("") + str.substr(to + 1);

const rotateLeft = (str: string, amount: number) => str.substr(amount % str.length) + str.substr(0, amount % str.length);
const rotateRight = (str: string, amount: number) => rotateLeft(str, str.length - (amount % str.length));

const move = (str: string, from: number, to: number) => {
    const strWithout = str.replace(str[from], "");
    return strWithout.substr(0, to) + str[from] + strWithout.substr(to)
};

const rotateBased = (str: string, char: string) => rotateRight(str, 1 + (str.indexOf(char) < 4 ? str.indexOf(char) : str.indexOf(char) + 1));

const undoBasedRotate = (str: string, base: string) => {
    const before = str;
    let result = rotateRight(str, 1);
    while (rotateBased(result, base) !== before) {
        result = rotateRight(result, 1);
    }
    return result;
}

let letters = 'abcdefgh';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const instructions: string[] = fileBuffer.toString().split("\n");

for (const instruction of instructions) {
    const parts = instruction.split(" ");
    if (instruction.startsWith('swap position')) {
        letters = swapAt(letters, parseInt(parts[2]), parseInt(parts[5]));
    }
    else if (instruction.startsWith('swap letter')) {
        letters = swapLetters(letters, parts[2], parts[5]);
    }
    else if (instruction.startsWith('reverse')) {
        letters = reverse(letters, parseInt(parts[2]), parseInt(parts[4]));
    }
    else if (instruction.startsWith('rotate left')) {
        letters = rotateLeft(letters, parseInt(parts[2]));
    }
    else if (instruction.startsWith('rotate right')) {
        letters = rotateRight(letters, parseInt(parts[2]));
    }
    else if (instruction.startsWith('move')) {
        letters = move(letters, parseInt(parts[2]), parseInt(parts[5]));
    }
    else if (instruction.startsWith('rotate based')) {
        letters = rotateBased(letters, parts[6]);
    }
}

console.log(letters);

letters = 'fbgdceah';
// reverse
for (const instruction of instructions.reverse()) {
    const parts = instruction.split(" ");
    if (instruction.startsWith('swap position')) {
        letters = swapAt(letters, parseInt(parts[2]), parseInt(parts[5]));
    }
    else if (instruction.startsWith('swap letter')) {
        letters = swapLetters(letters, parts[2], parts[5]);
    }
    else if (instruction.startsWith('reverse')) {
        letters = reverse(letters, parseInt(parts[2]), parseInt(parts[4]));
    }
    else if (instruction.startsWith('rotate left')) {
        letters = rotateRight(letters, parseInt(parts[2]));
    }
    else if (instruction.startsWith('rotate right')) {
        letters = rotateLeft(letters, parseInt(parts[2]));
    }
    else if (instruction.startsWith('move')) {
        letters = move(letters, parseInt(parts[5]), parseInt(parts[2]));
    }
    else if (instruction.startsWith('rotate based')) {
        letters = undoBasedRotate(letters, parts[6]);
    }
}

console.log(letters);
