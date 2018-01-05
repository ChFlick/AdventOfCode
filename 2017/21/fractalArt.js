function calculateImage(input){
    "use strict";

    var result = '';

    var iterations = 18;
    var currentImage = [['.', '#', '.'],
                        ['.', '.', '#'],
                        ['#', '#', '#']];

    var rules = input.split('\n').map(function (line) {
        if(line.trim() !== '') {
            return new Rule(line.split('=>')[0], line.split('=>')[1]);
        }
    });

    for(var iter = 0; iter < iterations; iter++){
        var partialImages = [];
        if(currentImage.length % 2 == 0){
            for(var i = 0; i < currentImage.length / 2; i++){
                for(var j = 0; j < currentImage.length / 2; j++){
                    partialImages.push(new PartialImage([[currentImage[j * 2][i * 2],     currentImage[j * 2 + 1][i * 2]],
                                                         [currentImage[j * 2][i * 2 + 1], currentImage[j * 2 + 1][i * 2 + 1]]], j, i));
                }
            }
        } else {
            for(var i = 0; i < currentImage.length / 3; i++){
                for(var j = 0; j < currentImage.length / 3; j++){
                    partialImages.push(new PartialImage(
                        [[currentImage[j * 3][i * 3],     currentImage[j * 3][i * 3 + 1], currentImage[j * 3][i * 3 + 2]],
                         [currentImage[j * 3 + 1][i * 3], currentImage[j * 3 + 1][i * 3 + 1], currentImage[j * 3 + 1][i * 3 + 2]],
                         [currentImage[j * 3 + 2][i * 3], currentImage[j * 3 + 2][i * 3 + 1], currentImage[j * 3 + 2][i * 3 + 2]]], j, i));
                }
            }
        }

        partialImages.forEach(function (partialImage) {
            rules.every(function(rule){
                var result = rule.parse(partialImage.image);
                if(result){
                    for(var i = 0; i < result.length; i++){
                        for(var j = 0; j < result.length; j++){
                            if(!currentImage[j + partialImage.offsetX * rule.output[0].length]) {
                                currentImage[j + partialImage.offsetX * rule.output[0].length] = []
                            }
                            currentImage[j + partialImage.offsetX * rule.output[0].length][i + partialImage.offsetY * rule.output[0].length] = result[j][i]
                        }
                    }
                }
                return !result
            });
        });


    }

    result += get2darrayashtmlstring(currentImage);
    result += '<br>'
    result += currentImage.reduce((sum, row) => sum + row.reduce((sum, ele) => sum + (ele === '#' ? 1 : 0), 0), 0);

    return result;
}

function PartialImage(image, offsetX, offsetY){
    "use strict";

    this.image = image;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
}

function Rule(inputs, outputs){
    "use strict";

    this.input = inputs.split('/').map(ele => ele.trim());
    this.output = outputs.split('/').map(ele => ele.trim());

    // rectangle = String[][]
    this.parse = function (rectangle) {
        var rectangleCopy = [];
        var success = false;

        for (var i = 0; i < rectangle.length; i++) {
            rectangleCopy[i] = rectangle[i].slice();
        }

        if(rectangle.length != this.input.length){
            return null;
        }

        for(var tries = 0; tries < 8; tries++) {
            success = true;
            for (var i = 0; i < rectangleCopy.length; i++) {
                success = success && this.input[i] === rectangleCopy[i].join('');
            }

            if(success){
                return this.output.map(ele => ele.split(''));
            }

            rectangleCopy = rotateRectangle(rectangleCopy);
            if(tries == 3){
                rectangleCopy = flipRectangle(rectangleCopy);
            }
        }

        return null;
    };

    this.toString = function(){
        return this.input.join('/') + ' = > ' + this.output.join('/');
    };

    function rotateRectangle(rectangle){
        var newRectangle = [];
        for (var i = 0; i < rectangle.length; i++) {
            newRectangle[i] = []
        }
        for (var i = 0; i < rectangle.length; i++) {
            for (var j = 0; j < rectangle.length; j++) {
                newRectangle[i][rectangle.length - (j + 1)] = rectangle[j][i];
            }
        }

        return newRectangle;
    }

    function flipRectangle(rectangle){
        var newRectangle = [];
        for (var i = 0; i < rectangle.length; i++) {
            newRectangle[i] = []
        }
        for (var i = 0; i < rectangle.length; i++) {
            for (var j = 0; j < rectangle.length; j++) {
                newRectangle[i][j] = rectangle[rectangle.length - (i + 1)][j];
            }
        }

        return newRectangle;
    }
}

function get2darrayashtmlstring(arr) {
    var str = "<pre>";
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            str += arr[i][j];
        }
        str += "<br>";
    }
    str += "</pre>";
    return str;
}

function get2darrayasstring(arr) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            str += arr[i][j];
        }
        str += "\n";
    }
    return str;
}

function print2darray(arr){
    console.log(get2darrayasstring(arr));
}
