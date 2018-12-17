var fs = require("fs"),
    path = require("path"),
    filePath = path.join(__dirname, 'input.txt');

const WORKER_COUNT = 5;

fs.readFile(filePath, {
    encoding: 'utf-8'
}, function (err, data) {
    if (!err) {
        lines = data.split("\r\n");

        //ABCDEFGHIJKLMNOPQRSTUVWXYZ
        const nodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(c => new Node(c));

        lines.forEach(line => {
            const before = line[5];
            const after = line[36];

            const beforeNode = nodes.find(node => node.character === before);
            const afterNode = nodes.find(node => node.character === after);

            beforeNode.addNext(afterNode);
            afterNode.addPrev(beforeNode);
        });

        const frontNodes = nodes.filter(node => node.prevSteps.length === 0);
        
        const startNode = new Node("");
        startNode.timeTillFinished = 0;
        frontNodes.forEach(n => {
            startNode.addNext(n);
            n.addPrev(startNode);
        });

        const result = getTimeUsed(startNode, "");
        console.log(result);
    }
});

class Node {
    constructor(character) {
        this.character = character;
        this.timeTillFinished = 60 + character.charCodeAt(0) - 64; //60 Seks + 1 = A, 2 = B ...
        this.nextSteps = [];
        this.prevSteps = [];
    }

    workOn() {
        this.timeTillFinished--;
    }

    isFinished() {
        return this.timeTillFinished === 0;
    }

    canBeExecuted() {
        return this.prevSteps.reduce((sum, node) => sum && node.isFinished(), true);
    }

    followersFinished() {
        return this.nextSteps.reduce((sum, node) => sum && node.isFinished(), true);
    }

    addNext(node) {
        this.nextSteps.push(node);
    }

    addPrev(node) {
        this.prevSteps.push(node);
    }
}

function getTimeUsed(startNode) {
    let nodesUnderConstruction = [];
    let nextPossibleNodes = startNode.nextSteps;
    let timeUsed = 0;

    do {
        if(nextPossibleNodes.length > 0 && nodesUnderConstruction.length < WORKER_COUNT) {
            const nextNode = nextPossibleNodes.sort((n1, n2) => n1.character > n2.character)[0];
            nodesUnderConstruction.push(nextNode);

            nextPossibleNodes.splice(nextPossibleNodes.indexOf(nextNode), 1);

            continue;
        }

        timeUsed++;
        nodesUnderConstruction.forEach(node => node.workOn());
        
        console.log("Constructing: " + nodesUnderConstruction.reduce((s, p) => s + p.character, ""));

        nodesUnderConstruction
            .filter(node => node.isFinished())
            .forEach(node => nextPossibleNodes = nextPossibleNodes.concat(node.nextSteps.filter(n => n.canBeExecuted())));

        nodesUnderConstruction = nodesUnderConstruction.filter(node => !node.isFinished());
    } while (nodesUnderConstruction.length > 0 || nextPossibleNodes.length > 0);
   
    return timeUsed;
}