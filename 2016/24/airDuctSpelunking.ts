import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
let map: string[] = fileBuffer.toString().split("\n");

const isNumber = (char: string) => !isNaN(parseInt(char));
const countNumbersOnMap = (map: string[]) =>
    map.reduce((sum, curr) => sum + curr.split('').reduce((lineSum, char) => lineSum + (isNumber(char) ? 1 : 0), 0), 0);

let startPos: [number, number];
map.forEach((x, i) => {
    if (x.indexOf("0") > -1) {
        startPos = [i, x.indexOf("0")];
    }
});

console.log(startPos, countNumbersOnMap(map));

const removeNumberAt = (map: string[], position: [number, number]): string[] => {
    const zeroLine = map[position[0]].split('');
    zeroLine[position[1]] = '.';
    map[position[0]] = zeroLine.join('');

    return map;
}

map = removeNumberAt(map, startPos);

console.log(map);
console.log(countNumbersOnMap(map));

const findNearest = (map: string[], startPos: [number, number]): [[number, number], number] => {
    const visitedPositions: Set<string> = new Set();
    let positions: Map<string, [number, number]> = new Map();
    positions.set(startPos.toString(), startPos);

    let foundPosition: [number, number] = null;
    let moves = 0;
    while (foundPosition === null) {
        moves++;
        let nextPositions: Map<string, [number, number]> = new Map();
        positions.forEach((pos, hash) => {
            if (visitedPositions.has(hash)) {
                return;
            }

            if (isNumber(map[pos[0]][pos[1]])) {
                foundPosition = pos;
                return;
            }

            if (map[pos[0] + 1][pos[1]] !== '#') {
                nextPositions.set([pos[0] + 1, pos[1]].toString(), [pos[0] + 1, pos[1]]);
            }
            if (map[pos[0] - 1][pos[1]] !== '#') {
                nextPositions.set([pos[0] - 1, pos[1]].toString(), [pos[0] - 1, pos[1]]);
            }
            if (map[pos[0]][pos[1] + 1] !== '#') {
                nextPositions.set([pos[0], pos[1] + 1].toString(), [pos[0], pos[1] + 1]);
            }
            if (map[pos[0]][pos[1] - 1] !== '#') {
                nextPositions.set([pos[0], pos[1] - 1].toString(), [pos[0], pos[1] - 1]);
            }

            visitedPositions.add(pos.toString());
        });
        positions = nextPositions;
    }

    return [foundPosition, moves - 1];
};

let fullMoves = 0;
let currentPosition = startPos;
while(countNumbersOnMap(map) > 0) {
    console.log('start from ' + currentPosition);
    
    const [foundPosition, moves] = findNearest(map, currentPosition);
    map = removeNumberAt(map, foundPosition);
    fullMoves += moves;
    currentPosition = foundPosition;

    console.log(moves, 'to', foundPosition);
}

console.log(fullMoves);
