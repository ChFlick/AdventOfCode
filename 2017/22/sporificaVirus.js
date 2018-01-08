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
           grid.set(positionString(x, y), new InfectionStatus(ele === '#'));
        });
    });

    carrierY = Math.floor(input.split('\n').length / 2);
    carrierX = Math.floor(input.split('\n')[0].split('').length / 2);

    for(var i = 0; i < 10000000; i++){
        var currentEle = grid.get(positionString(carrierX, carrierY)) || new InfectionStatus(false);
        switch(currentEle.infectionStatus){
            case 0: direction += 3; break;
            case 1: timesInfected++; break;
            case 2: direction++; break;
            case 3: direction += 2; break;
        }

        currentEle.update();
        grid.set(positionString(carrierX, carrierY), currentEle);

        switch (direction % 4){
            case 0: carrierY--; break;
            case 1: carrierX++; break;
            case 2: carrierY++; break;
            case 3: carrierX--; break;
        }

        // uncomment for animation
        // await sleep(50);
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
                result += '[';
            } else {
                result += ' ';
            }

            var currentEle = grid.get(positionString(x, y)) || new InfectionStatus(false);
            switch(currentEle.infectionStatus){
                case 0: result += '.'; break;
                case 1: result += 'W'; break;
                case 2: result += '#'; break;
                case 3: result += 'F'; break;
            }

            if(x === carrierX && y === carrierY){
                result += ']';
            } else {
                result += ' ';
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

function InfectionStatus(isInfected){
    // clean = 0, weak = 1, infected = 2, flagged = 3
    this.infectionStatus = isInfected ? 2 : 0;

    this.isInfected = function(){
        return this.infectionStatus > 1;
    };

    this.update = function(){
        this.infectionStatus = (this.infectionStatus + 1) % 4;
    };
}
