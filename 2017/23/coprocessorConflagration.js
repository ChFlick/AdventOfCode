"use strict";

async function runProcessor(input){
    var instructions = input.trim().split('\n');
    var registers = {"a": 0, "b": 0, "c": 0, "d": 0, "e": 0, "f": 0, "g": 0}
    var instructionPointer = 0;
    var timesMult = 0;
    var steps = 0;

    var toVal = a => {
        const val = parseInt(a);
        if(isNaN(val)){
            return registers[a]
        }
        return val
    }

    while(instructionPointer >= 0 && instructionPointer < instructions.length){
        steps++;
        var instruction = instructions[instructionPointer].substr(0, 3);
        var firstVal = instructions[instructionPointer].substr(4,1)
        var secondVal = toVal(instructions[instructionPointer].substr(6));
        switch(instruction){
            case "set":
                registers[firstVal] = secondVal
                instructionPointer++;
                break;
            case "sub":
                registers[firstVal] = registers[firstVal] - secondVal;
                instructionPointer++;
                break;
            case "mul":
                timesMult++;
                registers[firstVal] = registers[firstVal] * secondVal;
                instructionPointer++;
                break;
            case "jnz":
                if(toVal(firstVal) !== 0){
                    instructionPointer += secondVal;
                } else {
                    instructionPointer++;
                }
                break;
        }

        if(steps % 50 === 0){
            await sleep(1);
            document.getElementById('result').innerHTML = toHtml(instructions, instructionPointer, registers);
        }
    }

    document.getElementById('result').innerHTML = toHtml(instructions, instructionPointer, registers) + timesMult;
}

function toHtml(instructions, instructionPointer, registers){
    var result = '<pre>';
    result += 'Current Instruction:' + instructions[instructionPointer];
    result += '<br/>';
    result += 'Registers: <br/>';

    for (const key in registers) {
        if (registers.hasOwnProperty(key)) {
            const element = registers[key];
            result += key + ' : ' + element + '<br/>';
        }
    }

    result += '</pre>';

    return result;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
