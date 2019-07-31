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
    const tempMap = map.slice(0);
    const zeroLine = tempMap[position[0]].split('');
    zeroLine[position[1]] = '.';
    tempMap[position[0]] = zeroLine.join('');

    return tempMap;
}

map = removeNumberAt(map, startPos);

const findNearest = (map: string[], startPos: [number, number]): [[number, number], number][] => {
    const visitedPositions: Set<string> = new Set();
    let positions: Map<string, [number, number]> = new Map();
    positions.set(startPos.toString(), startPos);

    let foundPositions: [[number, number], number][] = [];
    let moves = 0;
    while (foundPositions.length !== countNumbersOnMap(map) - 1) {
        moves++;
        let nextPositions: Map<string, [number, number]> = new Map();
        positions.forEach((pos, hash) => {
            if (visitedPositions.has(hash)) {
                return;
            }

            if (isNumber(map[pos[0]][pos[1]])) {
                foundPositions.push([pos, moves - 1]);
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

    return foundPositions;
};

let next: [string[], [number, number], number][] = [[map, startPos, 0]]
while (true) {
    let overNext: [string[], [number, number], number][] = []
    
    next.forEach(([map, currentPosition, moves]) => {
        const results = findNearest(map, currentPosition);
        results.forEach(([pos, addedMoves]) => {
            const another: [string[], [number, number], number] = [removeNumberAt(map, pos), pos, moves + addedMoves];
            if(!overNext.find(o => o[0].toString() === another[0].toString() && o[1].toString() === another[1].toString())) {
                overNext.push(another);
            };
        });
    });

    console.log(Math.min(...next.map(([map, pos, moves]) => moves)));
    
    if(overNext.length === 0) {
        break;
    }
    next = overNext;
}
