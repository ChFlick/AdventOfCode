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

class Minecart {
    private direction: Direction;
    private position: Point;

    constructor(direction: Direction, position: Point) {
        this.direction = direction;
        this.position = position;
    }
}


let dir = Direction.Down;
let pos = {x: 10, y: 10};
let minecart = new Minecart(dir, pos);

console.log(minecart);