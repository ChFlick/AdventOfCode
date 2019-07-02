import * as fs from 'fs';
import * as path from 'path';

type CharSum = [string, number];

class Room {
    readonly room: string;
    readonly statedChecksum: string;
    readonly realChecksum: string;

    constructor(room: string, statedChecksum: string) {
        this.room = room;
        this.statedChecksum = statedChecksum;
        this.realChecksum = this.calculateChecksum(room);
    }

    calculateChecksum = (room: string): string => {
        let checksum = "";
        const sums: CharSum[] = room.split("")
            .filter((char: string) => char.match(/[a-z]/))
            .reduce((sums: CharSum[], char: string) => {
                if (!sums.find(v => v[0] == char)) {
                    const n: number = room.split("").reduce((sum, c) => c === char ? sum + 1 : sum, 0);
                    sums.push([char, n]);
                }
                return sums;
            }, []);

        sums.sort((a, b) => a[0].localeCompare(b[0]))
        sums.sort((a, b) => b[1] - a[1]);

        return sums.slice(0, 5).map(v => v[0]).join("");
    }

    isReal(): boolean {
        return this.statedChecksum === this.realChecksum;
    }
}

const fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const rooms: Room[] = fileBuffer.toString().split('\n')
    .map(line => line.split("["))
    .map(split => new Room(split[0], split[1].substr(0, split[1].length - 1)));
