import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const input: string[][] = fileBuffer.toString().split('\n').map(s => s.split(','));

const getCoords = (start: [number, number], direction: string, steps: number): [number, number][] => {
    const result = [];
    for (let i = 1; i < steps + 1; i++) {
        if (direction === "R") { result.push([start[0] + i, start[1]]) }
        if (direction === "L") { result.push([start[0] - i, start[1]]) }
        if (direction === "U") { result.push([start[0], start[1] + i]) }
        if (direction === "D") { result.push([start[0], start[1] - i]) }
    }

    return result;
}


let firstCoords: [number, number][] = [[0, 0]];
firstCoords = input[0].reduce((prev, op) => [...prev, ...getCoords(prev.slice(-1)[0], op.substr(0, 1), parseInt(op.substr(1)))], firstCoords);

let secondCoords: [number, number][] = [[0, 0]];
secondCoords = input[1].reduce((prev, op) => [...prev, ...getCoords(prev.slice(-1)[0], op.substr(0, 1), parseInt(op.substr(1)))], secondCoords);
firstCoords.shift();
secondCoords.shift();

const overlaps = firstCoords.filter(coord => !!secondCoords.find(c => c[0] === coord[0] && c[1] === coord[1]));
const dist = overlaps.map(o => Math.abs(o[0]) + Math.abs(o[1]));
console.log(Math.min(...dist));

