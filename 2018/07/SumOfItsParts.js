var fs = require("fs"),
    path = require("path"),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, {
    encoding: 'utf-8'
}, function (err, data) {
    if (!err) {
        lines = data.split("\r\n");

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
        startNode.wasUsed = true;
        frontNodes.forEach(n => {
            startNode.addNext(n);
            n.addPrev(startNode);
        });

        const result = printNodes(startNode, "");
        console.log(result);
    }
});

class Node {
    constructor(character) {
        this.character = character;
        this.wasUsed = false;
        this.nextSteps = [];
        this.prevSteps = [];
    }

    canBeExecuted() {
        return this.prevSteps.reduce((sum, node) => sum && node.wasUsed, true);
    }

    followersFinished() {
        return this.nextSteps.reduce((sum, node) => sum && node.wasUsed, true);
    }

    addNext(node) {
        this.nextSteps.push(node);
    }

    addPrev(node) {
        this.prevSteps.push(node);
    }
}

function printNodes(startNode) {
    let nextPossibleNodes = startNode.nextSteps;
    let str = "";

    do {
        const currentNode = nextPossibleNodes.sort((n1, n2) => n1.character > n2.character)[0];

        str += currentNode.character;
        currentNode.wasUsed = true;

        nextPossibleNodes.splice(nextPossibleNodes.indexOf(currentNode), 1);
        nextPossibleNodes = nextPossibleNodes.concat(currentNode.nextSteps.filter(n => n.canBeExecuted()));
    } while (nextPossibleNodes.length > 0);
   
    return str;
}