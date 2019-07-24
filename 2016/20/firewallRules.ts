import * as fs from 'fs';
import * as path from 'path';

class Range {
    from: number;
    to: number;

    constructor(from: number, to: number) {
        this.from = from;
        this.to = to;
    }

    includes = (n: number) => n >= this.from && n <= this.to;
}

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const ranges: Range[] = fileBuffer.toString().split("\n").map(v => v.split("-")).map(v => new Range(parseInt(v[0]), parseInt(v[1])));

ranges.sort((a, b) => a.to - b.to);

for (const range of ranges) {
    const oneHigher = range.to + 1;
    if (!ranges.find((any => any.includes(oneHigher)))) {
        console.log(oneHigher);
        break;
    }
}

let n = 0;
for (const range of ranges) {
    const oneHigher = range.to + 1;
    if (!ranges.find((any => any.includes(oneHigher)))) {
        const higherRanges = ranges.filter(r => r.from > oneHigher);
        const nextRange = higherRanges.sort((a, b) => a.from - b.from)[0];
        if(!nextRange) {
            continue;
        }
        n += nextRange.from - oneHigher;
    }
}

console.log(n);
