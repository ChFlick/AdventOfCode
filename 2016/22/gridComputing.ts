import * as path from 'path';
import * as fs from 'fs';

class Node {
    position: [number, number];
    used: number;
    avail: number;

    constructor(position: [number, number], used: number, avail: number) {
        this.position = position;
        this.used = used;
        this.avail = avail;
    }
}

const buffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const dfLines = buffer.toString().split('\n');
dfLines.shift();
dfLines.shift();

const nodes = dfLines.map(line => line.split(/ +/)).map(split => new Node(
    [parseInt(split[0].split('-')[1].substr(1)), parseInt(split[0].split('-')[2].substr(1))],
    parseInt(split[2].replace('T', '')),
    parseInt(split[3].replace('T', ''))));

// const grid: Map<string, Node> = new Map();
// nodes.forEach(node => grid.set(node.position.toString(), node));

let viablePairs = 0;
for (const firstNode of nodes) {
    for (const secondNode of nodes) {
        if (firstNode === secondNode || firstNode.used === 0) {
            continue;
        }
        if (firstNode.used <= secondNode.avail) {
            viablePairs++;
        }
    }
}

console.log(viablePairs);
