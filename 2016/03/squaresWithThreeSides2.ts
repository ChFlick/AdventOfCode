import * as fs from 'fs';
import * as path from 'path';

type Triangle = [number, number, number]

const fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const numbers: number[][] = fileBuffer.toString().split('\n').map(line => line.trim().split(/ +/).map(x => parseInt(x)))
const flatNumbers = numbers.map(n => n[0]).concat(numbers.map(n => n[1])).concat(numbers.map(n => n[2]))
const triangles: Triangle[] = []
for(let i = 0; i < flatNumbers.length; i += 3) {
    triangles.push([flatNumbers[i], flatNumbers[i + 1], flatNumbers[i + 2]])
}

const validTriangles = triangles
    .map(t => t[0] + t[1] + t[2] - Math.max(...t) > Math.max(...t))
    .reduce((sum, curr) => sum += curr ? 1 : 0, 0);
    
console.log(validTriangles);

const validTriangles2 = triangles
    .map(t => t.sort((a,b) => a-b))
    .map(t => t[0] + t[1] > t[2])
    .reduce((sum, curr) => sum += curr ? 1 : 0, 0);

console.log(validTriangles2);

