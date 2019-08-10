import * as fs from 'fs';
import * as path from 'path';
import { globalAgent } from 'http';

class Entity {
    position: [number, number]
    hp: number
    dmg: number

    constructor(position: [number, number]) {
        this.position = position;
        this.hp = 200;
        this.dmg = 3;
    }

    attack(entity: Entity) {
        entity.hp -= this.dmg;
    }

    isDead(): boolean {
        return this.hp <= 0;
    }
}

class Goblin extends Entity { }
class Elf extends Entity { }
type Blocker = '#';
type Free = '.';

const goblins: Goblin[] = [];
const elves: Elf[] = [];

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const inputMap: string[] = fileBuffer.toString().split("\n");

const map: (Elf | Goblin | Blocker | Free)[][] = [];
inputMap.forEach(() => map.push([]));

for (let y = 0; y < inputMap.length; y++) {
    for (let x = 0; x < inputMap[y].length; x++) {
        const char = inputMap[x][y];
        if (char === 'G') {
            const goblin = new Goblin([x, y]);
            goblins.push(goblin);
            map[x][y] = goblin;
        } else if (char === 'E') {
            const elf = new Elf([x, y]);
            elves.push(elf);
            map[x][y] = elf;
        } else if (char === '#') {
            map[x][y] = '#';
        } else {
            map[x][y] = '.';
        }
    }
}

console.log(map);
