import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const map: string[] = fileBuffer.toString().split("\n");

let startPos: [number, number];
map.forEach((x, i) => {
    if(x.indexOf("0") > -1) {
        startPos = [i, x.indexOf("0")];
    }
});

console.log(startPos);
