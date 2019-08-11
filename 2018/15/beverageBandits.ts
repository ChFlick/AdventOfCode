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

    moveToClosestEnemy(map: MapObject[][]) {
        const positions = getPosVariations(this.position);
        const steps = positions.map(pos => stepsToClosestEntity(pos, map, this instanceof Elf));
        if (steps.filter(s => s !== undefined).length === 0) {
            return;
        }
        const nextPosition = positions[steps.indexOf(Math.min(...steps.filter(v => v !== undefined)))];

        if (map[nextPosition[0]][nextPosition[1]] instanceof Entity) {
            return;
        }

        map[nextPosition[0]][nextPosition[1]] = this;
        map[this.position[0]][this.position[1]] = '.';
        this.position = nextPosition;
    }

    attackNextEnemy(map: MapObject[][]) {
        const positions = getPosVariations(this.position);
        const enemies: Entity[] = positions
            .map(pos => map[pos[0]][pos[1]])
            .filter((ele): ele is Entity => ele instanceof (this instanceof Elf ? Goblin : Elf));

        if (enemies.length === 0) {
            return;
        }

        const minHp = Math.min(...enemies.map(e => e.hp));
        const enemyToAttack = enemies.filter(e => e.hp === minHp)[0];

        this.attack(enemyToAttack);
        if (enemyToAttack.isDead()) {
            map[enemyToAttack.position[0]][enemyToAttack.position[1]] = '.';
            printMap(map);
        }
    }
}

class Goblin extends Entity { }
class Elf extends Entity { }
type Blocker = '#';
type Free = '.';
type MapObject = Elf | Goblin | Blocker | Free;


const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const inputMap: string[] = fileBuffer.toString().split("\n");

const map: MapObject[][] = [];
inputMap.forEach(() => map.push([]));

for (let y = 0; y < inputMap.length; y++) {
    for (let x = 0; x < inputMap[y].length; x++) {
        const char = inputMap[x][y];
        if (char === 'G') {
            const goblin = new Goblin([x, y]);
            map[x][y] = goblin;
        } else if (char === 'E') {
            const elf = new Elf([x, y]);
            map[x][y] = elf;
        } else if (char === '#') {
            map[x][y] = '#';
        } else {
            map[x][y] = '.';
        }
    }
}

const printMap = (map: MapObject[][]) => {
    for (let y = 0; y < map.length; y++) {
        let line = '';
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] instanceof Goblin) {
                line += 'G';
            } else if (map[y][x] instanceof Elf) {
                line += 'E';
            } else if (map[y][x] === '.' || map[y][x] === '#') {
                line += map[y][x];
            }
        }
        console.log(line);
    }
};

const containsGoblinAndElf = (map: MapObject[][]) => {
    const hasGoblin = map.find((row) => row.find(ele => ele instanceof Goblin));
    const hasElf = map.find((row) => row.find(ele => ele instanceof Elf));

    return hasGoblin && hasElf;
};

const getPosVariations = (pos: Position): Position[] =>
    [[pos[0] - 1, pos[1]],
    [pos[0], pos[1] - 1],
    [pos[0], pos[1] + 1],
    [pos[0] + 1, pos[1]]];

const stepsToClosestEntity = (position: Position, map: MapObject[][], searchGoblin: boolean): number => {
    const visitedPositions = new Set();
    let currentPositions: Position[] = [position];
    let steps = 0;
    while (currentPositions.length > 0) {
        currentPositions.forEach(pos => visitedPositions.add(pos.toString()));
        const nextPositions: Position[] = [];
        for (const curr of currentPositions) {
            const ele = map[curr[0]][curr[1]];
            if (ele instanceof (searchGoblin ? Goblin : Elf)) {
                return steps;
            } else if (ele === '#' || ele instanceof (searchGoblin ? Elf : Goblin)) {
                continue;
            }

            // Avoid duplicates
            getPosVariations(curr).forEach(pos => {
                if (!nextPositions.find(nextPos => nextPos[0] === pos[0] && nextPos[1] === pos[1])) {
                    nextPositions.push(pos);
                }
            });
        }

        currentPositions = nextPositions.filter(pos => !visitedPositions.has(pos.toString()));

        steps++;
    }
}

let rounds = 0;
while (containsGoblinAndElf(map)) {
    const order: Entity[] = map.reduce((arr, row) => arr.concat(row.filter(ele => ele instanceof Entity)), [])
        .filter((ele): ele is Entity => ele instanceof Entity); // last filter is only a typeguard

    for (const entity of order) {
        if(entity.isDead()) { continue; }
        entity.moveToClosestEnemy(map);
        entity.attackNextEnemy(map);
    };

    // printMap(map);
    rounds++;
}

const order: Entity[] = map.reduce((arr, row) => arr.concat(row.filter(ele => ele instanceof Entity)), [])
    .filter((ele): ele is Entity => ele instanceof Entity); // last filter is only a typeguard

console.log(rounds - 1, order.reduce((hp, entity) => hp + entity.hp, 0));
console.log((rounds - 1) * order.reduce((hp, entity) => hp + entity.hp, 0));
