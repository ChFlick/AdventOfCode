import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const compressed: string = fileBuffer.toString();

let decompressed = "";
let pos = 0;


while (pos < compressed.length) {
    if (compressed[pos].match(/[A-Z]/)) {
        decompressed += compressed[pos];
        pos++;
        continue;
    }
    
    const marker = compressed.substr(pos).match(/\(.*?\)/)[0];
    const [chars, times] = marker.replace("(", "").replace(")", "").split("x");
    decompressed += compressed.substr(pos + marker.length, parseInt(chars)).repeat(parseInt(times));
    pos += marker.length + parseInt(chars);
}

console.log(decompressed);
console.log(decompressed.length);

