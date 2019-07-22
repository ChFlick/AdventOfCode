import * as crypto from 'crypto';

const input = 'hhhxzeay';

// up = 0, down = 1, left = 2, right = 3
const getOpenDoors = (input: string) => crypto.createHash('md5').update(input).digest('hex')
    .substr(0, 4)
    .split("")
    .map(char => /b|c|d|e|f/.test(char));

const closeOuterDoors = (doors: boolean[], posX: number, posY: number) => [
    posY === 0 ? false : doors[0],
    posY === 3 ? false : doors[1],
    posX === 0 ? false : doors[2],
    posX === 3 ? false : doors[3]
];

let hasNext = true;
let steps = 0;
let positionsByText: Map<string, [number, number]> = new Map();
positionsByText.set(input, [0, 0]);
let maxSteps = 0;

while (hasNext) {
    hasNext = false;
    let nextPositionsByText: Map<string, [number, number]> = new Map();
    positionsByText.forEach((pos, text) => {
        if (pos[0] === 3 && pos[1] === 3) {
            maxSteps = steps;
            return;
        }
        const doors = closeOuterDoors(getOpenDoors(text), pos[0], pos[1]);
        if (doors[0]) { nextPositionsByText.set(text + "U", [pos[0], pos[1] - 1]); }
        if (doors[1]) { nextPositionsByText.set(text + "D", [pos[0], pos[1] + 1]); }
        if (doors[2]) { nextPositionsByText.set(text + "L", [pos[0] - 1, pos[1]]); }
        if (doors[3]) { nextPositionsByText.set(text + "R", [pos[0] + 1, pos[1]]); }
        hasNext = hasNext || doors.reduce((sum, c) => sum || c, false);
    });

    steps++;
    positionsByText = nextPositionsByText;
}

console.log(maxSteps);
