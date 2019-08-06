import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
let map: string[] = fileBuffer.toString().split("\n");

type NumberAndDistance = [number, number];
const isNumber = (char: string) => !isNaN(parseInt(char));
const countNumbersOnMap = (map: string[]) =>
    map.reduce((sum, curr) => sum + curr.split('').reduce((lineSum, char) => lineSum + (isNumber(char) ? 1 : 0), 0), 0);

const findPosOf = (number: string) => {
    let result: [number, number];
    map.forEach((x, i) => {
        if (x.indexOf(number) > -1) {
            result = [i, x.indexOf(number)];
        }
    });

    return result;
}

const getDistanceToNumbers = (map: string[], startPos: [number, number]): NumberAndDistance[] => {
    const visitedPositions: Set<string> = new Set();
    let positions: Map<string, [number, number]> = new Map();
    positions.set(startPos.toString(), startPos);

    let foundPositions: NumberAndDistance[] = [];
    let moves = 0;
    while (foundPositions.length !== countNumbersOnMap(map)) {
        moves++;
        let nextPositions: Map<string, [number, number]> = new Map();
        positions.forEach((pos, hash) => {
            if (visitedPositions.has(hash)) {
                return;
            }

            if (isNumber(map[pos[0]][pos[1]])) {
                foundPositions.push([parseInt(map[pos[0]][pos[1]]), moves - 1]);
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

const nums = ["0", "1", "2", "3", "4", "5", "6", "7"];

const distances = nums
    .map((n) => findPosOf(n))
    .map((p) => getDistanceToNumbers(map, p).filter(x => x[1] !== 0))

let minSteps = 3000;
const findShortestRoute = (currentNumber: number, path: number[], stepsTaken: number) => {
    if (path.length === nums.length) {
        minSteps = Math.min(minSteps, stepsTaken);
        console.log(path, stepsTaken);
        
        return;
    }

    if (stepsTaken > minSteps) {
        return;
    }

    if (path.includes(currentNumber)) {
        return;
    }

    path = [...path, currentNumber];
    distances[currentNumber].forEach((distance) => {
        findShortestRoute(distance[0], path, stepsTaken + distance[1]);
    });
}

findShortestRoute(0, [], 0);

console.log(minSteps);
