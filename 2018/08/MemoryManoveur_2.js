var fs = require("fs"),
    path = require("path"),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, {
    encoding: 'utf-8'
}, function (err, data) {
    if (!err) {
        values = data.split(" ").map(v => parseInt(v));

        const {currentNode: tree} = createTree(values, 0);
        
        const metadataValue = getTreeMetadataSum(tree);
        console.log(metadataValue);
    }
});

class Node {
    constructor() {
        this.childs = [];
        this.metadata = [];
    }

    addChild(node) {
        this.childs.push(node);
    }

    addMetadata(value) {
        this.metadata.push(value);
    }

    getChilds() {
        return this.childs;
    }

    getMetadata() {
        return this.metadata;
    }
}

function createTree(values, position) {
    const childNodeCount = values[position];
    position++;

    const metadataCount = values[position];
    position++;

    const currentNode = new Node();
    for(let i = 0; i < childNodeCount; i++) {
        const { currentNode: childNode, position: newPosition } = createTree(values, position);
        currentNode.addChild(childNode);
        position = newPosition;
    }

    for (let i = 0; i < metadataCount; i++) {
        currentNode.addMetadata(values[position]);
        position++;
    }
    
    return {currentNode, position};
}

function getTreeMetadataSum(tree) {
    let sum = 0;

    if(tree.getChilds().length === 0) {
        sum += tree.getMetadata().reduce((s, curr) => s += curr, 0);
    } else {
        sum += tree.getMetadata()
                .filter(metadataValue => tree.getChilds()[metadataValue - 1])
                .map(metadataValue => getTreeMetadataSum(tree.getChilds()[metadataValue - 1]))
                .reduce((a, b) => a + b, 0);
    }

    return sum;
}