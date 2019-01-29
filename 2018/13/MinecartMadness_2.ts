import * as fs from 'fs';
import * as path from 'path';

enum Direction {
    Up,
    Right,
    Down,
    Left,
}

interface Point {
    x: number;
    y: number;
}

const arrows: string = '<>^v';

const arrowByDirection: string[] = [];
arrowByDirection[Direction.Up] = '^';
arrowByDirection[Direction.Right] = '>';
arrowByDirection[Direction.Down] = 'v';
arrowByDirection[Direction.Left] = '<';

const directionByArrow: Direction[] = [];
directionByArrow['^'] = Direction.Up;
directionByArrow['>'] = Direction.Right;
directionByArrow['v'] = Direction.Down;
directionByArrow['<'] = Direction.Left;

function replaceAt(string: string, index: number, replace: string) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}


class Map {
    private map: string[];

    constructor(fileName: string) {
        let fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
        this.map = fileBuffer.toString().split('\r\n');
        console.log('Read map:\n', this.map);
    }

    getMinecarts(): Minecart[] {
        let minecarts: Minecart[] = [];

        this.map.forEach((line, y) => {
            line.split('').forEach((mapElement, x) => {
                if (arrows.includes(mapElement)) {
                    console.log(mapElement, directionByArrow[mapElement]);

                    minecarts.push(new Minecart(directionByArrow[mapElement], { x, y }, this));
                }
            });
        });

        return minecarts;
    }

    tileAt(x: number, y: number): string {
        return this.map[y][x];
    }

    printWith(minecarts: Minecart[]): any {
        let mapCopy: string[] = this.map.slice();
        mapCopy = mapCopy.map(row => row.replace('<', '-').replace('>', '-').replace('^', '|').replace('v', '|'));
        minecarts.forEach(m => mapCopy[m.getPos().y] = replaceAt(mapCopy[m.getPos().y], m.getPos().x, arrowByDirection[m.getDirection()]));
        console.log(mapCopy);
    }
}

class Minecart {
    private direction: Direction;
    private position: Point;
    private map: Map;
    private intersectionNum: number = 0;

    constructor(direction: Direction, position: Point, map: Map) {
        this.direction = direction;
        this.position = position;
        this.map = map;
    }

    move(): void {
        switch (this.direction) {
            case Direction.Up:
                this.position.y -= 1;
                break;
            case Direction.Down:
                this.position.y += 1;
                break;
            case Direction.Left:
                this.position.x -= 1;
                break;
            case Direction.Right:
                this.position.x += 1;
                break;
        }

        if (this.currentMapTile() === '\\') {
            this.goesUpOrDown() ? this.turnLeft() : this.turnRight();
        } else if (this.currentMapTile() === '/') {
            this.goesUpOrDown() ? this.turnRight() : this.turnLeft();
        } else if (this.currentMapTile() === '+') {
            if (this.intersectionNum % 3 === 0) {
                this.turnLeft()
            } else if (this.intersectionNum % 3 === 2) {
                this.turnRight();
            }
            this.intersectionNum++;
        }
    }

    private goesUpOrDown() {
        return this.direction % 2 == 0;
    }

    private turnLeft() {
        return this.direction = (this.direction + 3) % 4;
    }

    private turnRight() {
        return this.direction = (this.direction + 1) % 4;
    }

    private currentMapTile() {
        return map.tileAt(this.position.x, this.position.y);
    }

    comparePos(other: Minecart): number {
        if (this.position.y !== other.position.y) {
            return this.position.y - other.position.y;
        } else {
            return this.position.x - other.position.x;
        }
    }

    public getPos(): Point {
        return this.position;
    }

    public getDirection(): Direction {
        return this.direction;
    }
}

const INPUT_PATH = 'testInput.txt';


let map = new Map(INPUT_PATH);
let minecarts = map.getMinecarts();

console.log(minecarts);

try {
    for (let index = 0; index < 50000; index++) {
        minecarts.sort((a, b) => a.comparePos(b));
        minecarts.forEach(m => {
            m.move();

            minecarts = minecarts.filter((val, index, arr) => {
                let found = false;
                minecarts.forEach(m => found = found || m !== val && m.getPos().x === val.getPos().x && m.getPos().y === val.getPos().y);
                return !found;
            });

            if(minecarts.length === 1) {
                minecarts[0].move();
                throw Error(JSON.stringify(minecarts[0].getPos()));
            }
        });

        console.log('Iteration', index);
        // map.printWith(minecarts);
    }
} catch (e) {
    console.log(e);
}