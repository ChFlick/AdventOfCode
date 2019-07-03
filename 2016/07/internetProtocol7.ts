import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const ips: string[][] = fileBuffer.toString().split('\n').map(line => line.split(/\[|\]/));

const hasAbba = (str: string) => {
    const split = str.split("");
    for (let i = 0; i < split.length - 3; i++) {
        if (split[i] === split[i + 3] && split[i + 1] === split[i + 2] && split[i] !== split[i + 1]) {
            return true;
        }
    }
    return false;
}

const isIpValid = (ip: string[]) => {
    let braceAbba = false
    let noBraceAbba = false;
    ip.forEach((part, i) => {
        if (i % 2 == 1) {
            braceAbba = braceAbba || hasAbba(part);
        }
        else {
            noBraceAbba = noBraceAbba || hasAbba(part);
        }
    });
    return !braceAbba && noBraceAbba;
}

const validIps = ips.map((ip) => isIpValid(ip))
    .reduce((sum, valid) => valid ? sum + 1 : sum, 0);
console.log(validIps);