import * as fs from 'fs';
import * as path from 'path';

const logScreen = (screen: string[][]) => {
    for(const row of screen) {
        console.log(row.join(""));
    }    
}

const turnOn = (x: number, y: number, screen: string[][]) => {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            screen[j][i] = "#"
        }
    }

    return screen;
}

const rotateRow = (row: number, by: number) => {
    
}

const screen = [".".repeat(50).split(""),
                ".".repeat(50).split(""),
                ".".repeat(50).split(""),
                ".".repeat(50).split(""),
                ".".repeat(50).split(""),
                ".".repeat(50).split("")]
const fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const commands: string[] = fileBuffer.toString().split('\n');

for(const command of commands) {
    if(command.startsWith("rect")) {
        const [x, y] = command.slice(5).split("x");
        turnOn(parseInt(x), parseInt(y), screen);
        logScreen(screen);
    }
}

logScreen(turnOn(46, 4, screen));
