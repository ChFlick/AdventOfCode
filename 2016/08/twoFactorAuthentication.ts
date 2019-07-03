import * as fs from 'fs';
import * as path from 'path';

const logScreen = (screen: string[][]) => {
    for (const row of screen) {
        console.log(row.join(""));
    }
    console.log();
}

const turnOn = (x: number, y: number, screen: string[][]) => {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            screen[j][i] = "#"
        }
    }

    return screen;
}

const rotateRow = (rowNum: number, by: number, screen: string[][]) => {
    const row = screen[rowNum];
    const newRow = Array.of(...row);
    row.forEach((e, i) => newRow[(i + by) % row.length] = e);
    screen[rowNum] = newRow;

    return screen;
}

const rotateCol = (colNum: number, by: number, screen: string[][]) => {
    const col = screen.map(row => row[colNum]);
    col.forEach((e, i) => screen[(i + by) % col.length][colNum] = e);

    return screen;
}

const screen = [".".repeat(50).split(""),
".".repeat(50).split(""),
".".repeat(50).split(""),
".".repeat(50).split(""),
".".repeat(50).split(""),
".".repeat(50).split("")]
const fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const commands: string[] = fileBuffer.toString().split('\n');

for (const command of commands) {
    if (command.startsWith("rect")) {
        const [x, y] = command.slice(5).split("x");
        turnOn(parseInt(x), parseInt(y), screen);
    }
    else if (command.startsWith("rotate col")) {
        const [x, y] = command.slice(16).split(" by ");
        rotateCol(parseInt(x), parseInt(y), screen);
    }
    else if (command.startsWith("rotate row")) {
        const [x, y] = command.slice(13).split(" by ");
        rotateRow(parseInt(x), parseInt(y), screen);
    }

    logScreen(screen);
}

console.log(screen.reduce((sum, curr) => sum += curr.reduce((s, char) => char === "#" ? s + 1 : s, 0), 0));

