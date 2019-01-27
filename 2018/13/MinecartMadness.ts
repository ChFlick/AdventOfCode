import * as fs from 'fs';
import * as path from 'path';

enum Direction {
    Up,
    Right,
    Down,
    Left,
}

interface Point{
    x: number;
    y: number;
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
                if(mapElement === '^') {
                    minecarts.push(new Minecart(Direction.Up, {x, y}));
                }
                else if(mapElement === '>') {
                    minecarts.push(new Minecart(Direction.Right, {x, y}));
                }
                else if(mapElement === 'v') {
                    minecarts.push(new Minecart(Direction.Down, {x, y}));
                }
                else if(mapElement === '<') {
                    minecarts.push(new Minecart(Direction.Left, {x, y}));
                }
            });
        });

        return minecarts;
    }
}

class Minecart {
    private direction: Direction;
    private position: Point;

    constructor(direction: Direction, position: Point) {
        this.direction = direction;
        this.position = position;
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
    }
}

const INPUT_PATH = "testInput.txt";


let map = new Map(INPUT_PATH);
const minecarts = map.getMinecarts();

console.log(minecarts);