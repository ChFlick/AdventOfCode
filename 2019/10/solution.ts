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
const getVisibileAsteroidsFrom = (ix: number, iy: number) => {
    const radii = new Set();
    for (let x = 0; x < asteroids.length; x++) {
        for (let y = 0; y < asteroids[x].length; y++) {
            if (!asteroids[x][y]) {
                continue;
            }

            const angleDeg = radiusBetween(x, y, ix, iy);
            radii.add(angleDeg);
        }
    }
    return radii.size;
}

const visibleAsteroids = asteroidList.map(coords => getVisibileAsteroidsFrom(coords[0], coords[1]));
console.log(Math.max(...visibleAsteroids));
