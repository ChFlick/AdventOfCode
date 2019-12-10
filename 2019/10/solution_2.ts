import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const asteroids: boolean[][] = fileBuffer.toString().split('\n').map(line => line.split('').map(v => v === '#'));

const station = [25, 31]; //from task 1
const asteroidsByRadius = new Map<number, [number, number][]>();
const radii = new Set<number>();

for (let y = 0; y < asteroids.length; y++) {
    for (let x = 0; x < asteroids[y].length; x++) {
        if (!asteroids[y][x]) {
            continue;
        }

        const angleDeg = Math.abs(Math.atan2(x - station[0], y - station[1]) * 180 / Math.PI - 180);
        asteroidsByRadius[angleDeg] = asteroidsByRadius[angleDeg] ? [...asteroidsByRadius[angleDeg], [x, y]] : [[x, y]];
        radii.add(angleDeg);
    }
}

const sortedRadii = [...radii].sort((a, b) => a - b);

// console.log(sortedRadii);
console.log(asteroidsByRadius[sortedRadii[199]]);
