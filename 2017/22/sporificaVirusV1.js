"use strict";

async function runVirus(input){
    var timesInfected = 0;
    var grid = new Map();
    var carrierX;
    var carrierY;
    var direction = 0; // 0 = up, 1 = right, 2 = down, 3 = left, 4 = up, etc.

    input = input.trim();

    input.split('\n').forEach(function (line, y) {
        line.split('').forEach(function(ele, x){
           grid.set(positionString(x, y), ele === '#');
        });
    });

    carrierY = Math.floor(input.split('\n').length / 2);
    carrierX = Math.floor(input.split('\n')[0].split('').length / 2);

    for(var i = 0; i < 10000; i++){
        if(grid.get(positionString(carrierX, carrierY))){
            direction++;
        } else {
            direction += 3;
            timesInfected++;
        }

        grid.set(positionString(carrierX, carrierY), !grid.get(positionString(carrierX, carrierY)));

        switch (direction % 4){
            case 0: carrierY--; break;
            case 1: carrierX++; break;
            case 2: carrierY++; break;
            case 3: carrierX--; break;
        }

        // uncomment for animation
        // await sleep(1);
        // document.getElementById('result').innerHTML = gridToHtml(grid, carrierX, carrierY) + ' ' + timesInfected;
    }

    document.getElementById('result').innerHTML = gridToHtml(grid, carrierX, carrierY) + ' ' + timesInfected;
}

function positionString(posX, posY){
    return posX + ' ' + posY;
}

function gridToHtml(grid, carrierX, carrierY){
    var size = 30;
    var x;
    var y;

    var result = '<pre>';
    for(y = -size; y < size; y++){
        for(x = -size; x < size; x++){
            if(x === carrierX && y === carrierY){
                result += grid.get(positionString(x, y)) ? '[#]' : '[.]';
            } else {
                result += grid.get(positionString(x, y)) ? ' # ' : ' . ';
            }
        }
        result += '<br>';
    }
    result += '</pre>';

    return result;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
