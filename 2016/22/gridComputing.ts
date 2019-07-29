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

let viablePairs = [];
for (const firstNode of nodes) {
    for (const secondNode of nodes) {
        if (firstNode === secondNode || firstNode.used === 0) {
            continue;
        }
        if (firstNode.used <= secondNode.avail) {
            viablePairs.push(firstNode.position.toString());
        }
    }
}

console.log(viablePairs.length);

// V2

const grid: Map<string, Node> = new Map();
nodes.forEach(node => grid.set(node.position.toString(), node));

let t = "";
for (let y = 0; y < 29; y++) {
    t += y < 9 ? y + " " : y + "";
}
console.log(t);

for (let x = 0; x < 35; x++) {
    let t = "";
    for (let y = 0; y < 29; y++) {
        const node = nodes.find(n => n.position[0] === x && n.position[1] === y);
        t += (node.avail > node.used ? '_' : (viablePairs.includes(node.position.toString()) ? "." : "#"))  + " ";
    }
    console.log(t + x);
}
// calc by hand: move to the bottom left = [4 + 4 + 10 + 8 + 1] + move upward in "circles" 33*5(165) = 192