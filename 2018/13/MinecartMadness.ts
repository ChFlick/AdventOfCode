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

const arrowByDirection: string[] = [];
arrowByDirection[Direction.Up] = "^";
arrowByDirection[Direction.Right] = ">";
arrowByDirection[Direction.Down] = "v";
arrowByDirection[Direction.Left] = "<";

const directionByArrow: Direction[] = [];
directionByArrow["^"] = Direction.Up;
directionByArrow[">"] = Direction.Right;
directionByArrow["v"] = Direction.Down;
directionByArrow["<"] = Direction.Left;

function replaceAt(string: string, index: number, replace: string) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}


class Map {
    private map: string[];

    constructor(fileName: string) {
        let fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'));
        this.map = fileBuffer.toString().split('\r\n');
        console.log("Read map:\n", this.map);
    }

    getMinecarts(): Minecart[] {
        let minecarts: Minecart[] = [];

        this.map.forEach((line, y) => {
            line.split('').forEach((mapElement, x) => {
                if ("<>^v".includes(mapElement)) {
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
        mapCopy = mapCopy.map(row => row.replace("<", "-").replace(">", "-").replace("^", "|").replace("v", "|"));
        minecarts.forEach(m => mapCopy[m.getPos().y] = replaceAt(mapCopy[m.getPos().y], m.getPos().x, arrowByDirection[m.getDirection()]));
        console.log(mapCopy);
    }
}

class Minecart {
    private direction: Direction;
    private position: Point;
    private map: Map;

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

        console.log(this.direction);
        if (this.currentMapTile() === '\\') {
            // FIXME
            this.direction = (this.direction + this.direction === Direction.Down ? 3 : 1) % 4;
        } else if (this.currentMapTile() === '/') {
            this.direction = (this.direction + this.direction === Direction.Down ? 1 : 3) % 4;
        }
        console.log(this.direction);
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

const INPUT_PATH = "testInput.txt";


let map = new Map(INPUT_PATH);
const minecarts = map.getMinecarts();

console.log(minecarts);

for (let index = 0; index < 8; index++) {
    minecarts.sort((a, b) => a.comparePos(b));
    minecarts.forEach(m => m.move());

    console.log("Iteration", index);
    map.printWith(minecarts);
}
