import * as fs from 'fs';
import * as path from 'path';

type CharSum = [string, number];

class Room {
    private readonly roomName: string;
    private readonly sectorId: number;
    private readonly realName: string;

    constructor(room: string) {
        this.roomName = room.match(/[a-z-]+/)[0];
        this.sectorId = parseInt(room.match(/\d+/)[0]);
        this.realName = this.decipher(this.roomName.slice(), this.sectorId);
    }

    private decipher(room: string, sectorId: number): string {
        return room.split("").map(char => char === "-" ? "-" : this.rotateCharBy(char, sectorId)).join("");
    }

    private rotateCharBy(char: string, by: number): string {
        return String.fromCharCode((char.charCodeAt(0) - 97 + by) % 26 + 97);
    }

    getSectorId(): number {
        return this.sectorId;
    }

    getRealName(): string {
        return this.realName;
    }
}

const fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const rooms: Room[] = fileBuffer.toString().split('\n')
    .map(line => line.split("["))
    .map(split => new Room(split[0]));

const northPole: Room = rooms.find(room => room.getRealName().includes("northpole"));
console.log(northPole);
