import * as fs from 'fs';
import * as path from 'path';

type Position = [number, number];
class Entity {
    position: Position
    hp: number
    dmg: number

    constructor(position: Position) {
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
type MapObject = Elf | Goblin | Blocker | Free;


const goblins: Goblin[] = [];
const elves: Elf[] = [];

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const inputMap: string[] = fileBuffer.toString().split("\n");

const map: MapObject[][] = [];
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

const getPosVariations = (pos: Position): Position[] =>
    [[pos[0] + 1, pos[1]],
    [pos[0] - 1, pos[1]],
    [pos[0], pos[1] + 1],
    [pos[0], pos[1] - 1]];

const stepsToClosestEntity = (position: Position, map: MapObject[][], searchGoblin: boolean): number => {
    let currentPositions: Position[] = getPosVariations(position);
    let steps = 0;
    while (currentPositions.length > 0) {
        const nextPositions: Position[] = [];
        for (const pos of currentPositions) {
            const ele = map[pos[0]][pos[1]];
            if (ele instanceof (searchGoblin ? Goblin : Elf)) {
                return steps;
            } else if (ele === '#' || ele instanceof (searchGoblin ? Elf : Goblin)) {
                continue;
            }

            nextPositions.push(...getPosVariations(pos));
        }
        
        currentPositions = nextPositions;
        steps++;
    }
}

const order: Entity[] = map.reduce((arr, row) => arr.concat(row.filter(ele => ele instanceof Entity)), [])
    .filter((ele): ele is Entity => ele instanceof Entity); // last filter is only a typeguard

order.forEach(entity => {
    // entity.moveToClosestEnemy(); => findClosestEntity(entity.position, map, Entity)
});

console.log(stepsToClosestEntity([5,7], map, false));

