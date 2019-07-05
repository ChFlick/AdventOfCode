import * as fs from 'fs';
import * as path from 'path';

class Bot {
    botId: number
    valueOne: number
    valueTwo: number

    constructor(botId: number, valueOne?: number, valueTwo?: number) {
        this.botId = botId;

        if(valueOne){
            this.valueOne = valueOne;
        }
        if(valueTwo){
            this.valueTwo = valueTwo;
        }
    }

    highVal() {
        if (this.valueOne && this.valueTwo){
            return Math.max(this.valueOne, this.valueTwo);
        }

        return this.valueOne || this.valueTwo;
    }

    lowVal() {
        if (this.valueOne && this.valueTwo){
            return Math.min(this.valueOne, this.valueTwo);
        }

        return this.valueOne || this.valueTwo;
    }
}

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
let instructions: string[] = fileBuffer.toString().split("\n");

const bots: Bot[] = []
const outputs: number[] = "0".repeat(30).split("").map(x => parseInt(x))

for (const instruction of instructions.filter(i => i.startsWith("value"))) {
    const parts = instruction.split(" ");
    const botId = parseInt(parts[5]);
    const bot: Bot = bots.find(bot => bot.botId === botId);
    if(!bot) {
        bots.push(new Bot(botId, parseInt(parts[1])))
    } else {
        bot.valueTwo = parseInt(parts[1]);
    }
}

//value connections
instructions = instructions.filter(i => i.startsWith("bot"));
while (instructions.length > 0) {
    let restInstructions = [];
    for (const instruction of instructions) {
        
        const parts = instruction.split(" ");
        const givingBotId = parseInt(parts[1]);
        const givingBot: Bot = bots.find(bot => bot.botId === givingBotId);
        if(!givingBot) {
            restInstructions.push(instruction);
            continue;
        }

        if(!(givingBot.valueOne && givingBot.valueTwo)){
            restInstructions.push(instruction);
            continue;
        }

        const receivingLowId = parseInt(parts[6])
        if(parts[5] === "output") {
            outputs[receivingLowId] = givingBot.lowVal();
        } else {
            const receivingLowBot: Bot = bots.find(bot => bot.botId == receivingLowId);
            if(!receivingLowBot) {
                bots.push(new Bot(receivingLowId, givingBot.lowVal()))
            } else {
                receivingLowBot.valueTwo = givingBot.lowVal();
            }
        }

        const receivingHighId = parseInt(parts[11]);
        if(parts[10] === "output") {
            outputs[receivingHighId] = givingBot.highVal();
        } else {
            const receivingHighBot: Bot = bots.find(bot => bot.botId == receivingHighId);
            if(!receivingHighBot) {
                bots.push(new Bot(receivingHighId, givingBot.highVal()))
            } else {
                receivingHighBot.valueTwo = givingBot.highVal();
            }
        }
    }
    instructions = restInstructions;
}

// console.log(bots);
// console.log(outputs);

console.log(bots.find(bot => bot.valueOne === 17 && bot.valueTwo === 61))
console.log(bots.find(bot => bot.valueOne === 61 && bot.valueTwo === 17))