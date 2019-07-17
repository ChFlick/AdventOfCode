
const input = 1350;

const valueOf = (x: number, y: number) => x*x + 3*x + 2*x*y + y + y*y + input;

const countBinaryOnes = (value: number, n: number = 0) => {
    if (value === 0) {
        return n;
    }
    
    return countBinaryOnes(Math.floor(value / 2), value % 2 === 1 ? n + 1 : n);
}

const isOccupied = (x: number, y: number) => countBinaryOnes(valueOf(x, y)) % 2 === 1;

for(let i = 0; i < 40; i++) {
    const line = [];
    for(let j = 0; j < 40; j++) {
        line.push(isOccupied(j, i) ? "#":  ".");
    }
    console.log(line.join(""));
}