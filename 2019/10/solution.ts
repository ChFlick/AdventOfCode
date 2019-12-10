import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const asteroids: boolean[][] = fileBuffer.toString().split("\n").map(line => line.split('').map(v => v === '#'));

const asteroidList: [number, number][] = [];
for (let y = 0; y < asteroids.length; y++) {
    for (let x = 0; x < asteroids[y].length; x++) {
        if (asteroids[y][x]) {
            asteroidList.push([x, y]);
        }
    }
}

const radiusBetween = (x1, y1, x2, y2) => Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI;
const visibleAsteroidsFromPosition = (x: number, y: number) => asteroidList.reduce((radii, asteroid) => radii.add(radiusBetween(asteroid[0], asteroid[1], x, y)), new Set<number>()).size;

const visibleAsteroids = asteroidList.map(coords => visibleAsteroidsFromPosition(coords[0], coords[1]));
console.log(Math.max(...visibleAsteroids));
