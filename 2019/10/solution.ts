import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const asteroids: boolean[][] = fileBuffer.toString().split("\n").map(line => line.split('').map(v => v === '#'));

const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

const isVisibleFrom = (ix: number, iy: number, tx: number, ty: number) => {
    const distanceToTarget = distance(ix, iy, tx, ty);
    for (let x = 0; x < asteroids.length; x++) {
        for (let y = 0; y < asteroids[x].length; y++) {
            if (!asteroids[x][y] || (ix === x && iy === y) || (tx === x && ty === y)) {
                continue;
            }

            const distanceWithStep = distance(ix, iy, x, y) + distance(x, y, tx, ty);
            if (Math.abs(distanceToTarget - distanceWithStep) < 0.000005) {
                return false;
            }
        }
    }
    return true;
}

const getVisibileAsteroidsFrom = (ix: number, iy: number) => {
    let numberVisible = 0;
    for (let x = 0; x < asteroids.length; x++) {
        for (let y = 0; y < asteroids[x].length; y++) {
            if (!asteroids[x][y]) {
                continue;
            }

            if (isVisibleFrom(ix, iy, x, y)) {
                numberVisible++;
            }
        }
    }
    return numberVisible;
}


let maxN = 0;
let maxVal;
for (let x = 0; x < asteroids.length; x++) {
    for (let y = 0; y < asteroids[x].length; y++) {
        if (!asteroids[x][y]) {
            continue;
        }

        const visibleAsteroids = getVisibileAsteroidsFrom(x, y) - 1;
        if(visibleAsteroids > maxN) {
            maxN = visibleAsteroids;
            maxVal = [y, x];
        }
    }
}

console.log(maxN, maxVal);
