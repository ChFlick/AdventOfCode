
const input = 1350;
const target = [31, 39];

const valueOf = (x: number, y: number) => x * x + 3 * x + 2 * x * y + y + y * y + input;

const countBinaryOnes = (value: number, n: number = 0) => {
    if (value === 0) {
        return n;
    }

    return countBinaryOnes(Math.floor(value / 2), value % 2 === 1 ? n + 1 : n);
}

const isOccupied = (x: number, y: number) => countBinaryOnes(valueOf(x, y)) % 2 === 1;

const visitedNodes: number[][] = [];
const nodesByLen: Map<string, number> = new Map();
let queue: number[][] = [[1, 1]];

let i = 0;
while (!queue.find(v => v[0] == target[0] && v[1] == target[1])) {
    let nextQueue = [];
    for (const entry of queue) {
        const nextNodes = [
            [entry[0] + 1, entry[1]],
            [entry[0] - 1, entry[1]],
            [entry[0], entry[1] + 1],
            [entry[0], entry[1] - 1]];
        for (const nextNode of nextNodes) {
            // Out of bounds
            if (nextNode[0] < 0 || nextNode[1] < 0) {
                continue;
            }
            // Already visited
            if (visitedNodes.find(v => v[0] == nextNode[0] && v[1] == nextNode[1])) {
                continue;
            }
            // Occupied
            if (isOccupied(nextNode[0], nextNode[1])) {
                continue;
            }
            // Is already being visited
            if (nextQueue.find(v => v[0] == nextNode[0] && v[1] == nextNode[1])) {
                continue;
            }

            nextQueue.push(nextNode);
        }
    }
    queue = nextQueue;
    i++;
}

console.log(i);
