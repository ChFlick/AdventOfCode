import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const rows: string[] = fileBuffer.toString().split('\n');
const cols: string[] = [];
for(let i = 0; i < rows[0].length; i++) {
    let curr = rows.reduce((sum, curr) => sum += curr.charAt(i), "");
    cols.push(curr)
}

const charNumbersPerCol = cols.map(col => col.split("")
    .reduce((charNums, char) => {
        charNums[char] = charNums[char] ? charNums[char] + 1 : 1;
        return charNums;
    }, {})
)

// V1
const maxNums = charNumbersPerCol.map(charNums => Object.keys(charNums).reduce((max, curr) => charNums[curr] > max[1] ? [curr, charNums[curr]] : max, ["", 0]))

console.log(maxNums.reduce((s, c) => s + c[0], ""));

// V2
const minNums = charNumbersPerCol.map(charNums => Object.keys(charNums).reduce((min, curr) => charNums[curr] < min[1] ? [curr, charNums[curr]] : min, ["", 999]))

console.log(minNums.reduce((s, c) => s + c[0], ""));