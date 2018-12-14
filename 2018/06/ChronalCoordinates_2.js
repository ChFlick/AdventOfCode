var fs = require("fs"),
    path = require("path"),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, {
    encoding: 'utf-8'
}, function (err, data) {
    if (!err) {
        lines = data.split("\r\n");

        let distances = [];
        let coordinates = lines.map(line => [parseInt(line.split(",")[0]), parseInt(line.split(",")[1])]);

        let topLeft = [Math.min.apply(null, coordinates.map(c => c[0])), Math.min.apply(null, coordinates.map(c => c[1]))];
        let bottomRight = [Math.max.apply(null, coordinates.map(c => c[0])), Math.max.apply(null, coordinates.map(c => c[1]))];


        for (let y = topLeft[1]; y < bottomRight[1]; y++) {
            for (let x = topLeft[0]; x < bottomRight[0]; x++) {
                distances.push(getDistanceSum(coordinates, [x, y]));
            }
        }
        
        console.log(distances.filter(x => x < 10000).length);
    }
});

function getDistanceSum(coordinates, point) {
    return coordinates.reduce((sum, coord) => sum + manhattanDistance(coord, point), 0);
}

function manhattanDistance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}