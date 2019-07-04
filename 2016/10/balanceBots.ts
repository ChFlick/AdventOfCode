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
const instructions: string[] = fileBuffer.toString().split("\n");

const bots: Bot[] = []

for (const instruction of instructions) {
    const parts = instruction.split(" ");
    if (instruction.startsWith("value")) {
        const botId = parseInt(parts[5]);
        const bot: Bot = bots.find(bot => bot.botId === botId);
        if(!bot) {
            bots.push(new Bot(botId, parseInt(parts[1])))
        } else {
            bot.valueTwo = parseInt(parts[1]);
        }
    }
}

console.log(bots);
console.log(bots.map(bot => bot.lowVal()));

