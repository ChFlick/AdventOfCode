import * as fs from 'fs';
import * as path from 'path';

const getDecompressedLength = (compressed: string): number => {
    let len = 0;
    let pos = 0;

    while (pos < compressed.length) {
        if (compressed[pos].match(/[A-Z]/)) {
            pos++;
            len++;
            continue;
        }

        const marker = compressed.substr(pos).match(/\(.*?\)/)[0];
        const [chars, times] = marker.replace("(", "").replace(")", "").split("x");
        len += getDecompressedLength(compressed.substr(pos + marker.length, parseInt(chars)).repeat(parseInt(times)));
        pos += marker.length + parseInt(chars);
    }

    return len;
}

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
let compressed: string = fileBuffer.toString();

console.log(getDecompressedLength(compressed));
