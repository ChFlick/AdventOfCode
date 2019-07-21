import * as fs from 'fs';
import * as path from 'path';

class Disc {
    positions: number;
    startPos: number;

    constructor(positions: number, startPos: number) {
        this.positions = positions;
        this.startPos = startPos;
    }

    atTime = (time: number) => (this.startPos + time) % this.positions;

    isAlignedAt = (time: number) => this.atTime(time) === 0;
}

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const discs: Disc[] = fileBuffer.toString().split("\n").map(v => v.split(" ")).map(v => new Disc(parseInt(v[3]), parseInt(v[11].slice(0, -1))));

const allDiscsAligned = (discs: Disc[], time: number) => discs.reduce(
    (prevAligned, disc) => prevAligned && disc.isAlignedAt(time + discs.indexOf(disc) + 1), true
);

let i = 0;
while (!allDiscsAligned(discs, i)) {
    i++;
}

console.log(i);


