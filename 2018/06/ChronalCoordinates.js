var fs = require("fs"),
    path = require("path"),
    filePath = path.join(__dirname, 'input.txt');

const guardRegExp = /#([0-9]+)/;

fs.readFile(filePath, {
    encoding: 'utf-8'
}, function (err, data) {
    if (!err) {
        lines = data.split("\r\n");

        let map = [];
        let coordinates = lines.map(line => [parseInt(line.split(",")[0]), parseInt(line.split(",")[1])]);

        let stringifiedMap = "";
        let names = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm";
        let coordNames = {
            "none": "."
        };

        for (let i = 0; i < coordinates.length; i++) {
            coordNames[coordinates[i]] = names[i];
        }


        let topLeft = [Math.min.apply(null, coordinates.map(c => c[0])), Math.min.apply(null, coordinates.map(c => c[1]))];
        let bottomRight = [Math.max.apply(null, coordinates.map(c => c[0])), Math.max.apply(null, coordinates.map(c => c[1]))];


        for (let y = topLeft[1]; y < bottomRight[1]; y++) {
            for (let x = topLeft[0]; x < bottomRight[0]; x++) {
                let closestCoords = getClosestPlace(coordinates, [x, y]);
                let currentNode = map[closestCoords] || [];
                currentNode.push([x, y]);
                map[closestCoords] = currentNode;

                stringifiedMap += coordinates.reduce((prev, curr) => prev || curr[0] == x && curr[1] == y, false) ? "*" : coordNames[closestCoords];
            }
            stringifiedMap += "\n";
        }

        fs.writeFile(path.join(__dirname, 'map.txt'), stringifiedMap, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The map has been drawn!");
        });

        //Remove stuff that hits the border
        Object.keys(map).forEach(key => {
            if (map[key].reduce((prev, curr) =>
                    prev ||
                    curr[0] == topLeft[0] ||
                    curr[0] == bottomRight[0] ||
                    curr[1] == topLeft[1] ||
                    curr[1] == bottomRight[1], false)) {
                map[key] = [];
            }
        });

        Object.keys(map).forEach(key => {
            console.log(coordNames[key], map[key].length);
        });

        console.log(Object.values(map)
            .map(cList => cList.length)
            .sort((x, y) => y - x)[0]);
    }
});

function getClosestPlace(coordinates, point) {
    let closestDistance = 999999;
    let closestCoord;
    let twice = false;
    coordinates.forEach(coord => {
        let dist = manhattanDistance(coord, point);
        if (dist < closestDistance) {
            twice = false;
            closestDistance = dist;
            closestCoord = coord;
        } else if (dist === closestDistance) {
            twice = true;
        }
    });

    return twice ? "none" : closestCoord;
}

function manhattanDistance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}