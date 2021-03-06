import * as fs from 'fs';
import * as path from 'path';

type Triangle = [number, number, number]

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const triangles: Triangle[] = fileBuffer.toString().split('\n').map(line => line.trim().split(/ +/).map(x => parseInt(x))) as Triangle[]

const validTriangles = triangles
    .map(t => t[0] + t[1] + t[2] - Math.max(...t) > Math.max(...t))
    .reduce((sum, curr) => sum += curr ? 1 : 0, 0);
    
console.log(validTriangles);

const validTriangles2 = triangles
    .map(t => t.sort((a,b) => a-b))
    .map(t => t[0] + t[1] > t[2])
    .reduce((sum, curr) => sum += curr ? 1 : 0, 0);

console.log(validTriangles2);

