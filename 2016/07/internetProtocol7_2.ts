import * as fs from 'fs';
import * as path from 'path';

const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const ips: string[][] = fileBuffer.toString().split('\n').map(line => line.split(/\[|\]/));

const getBabsFromAbas = (str: string) => {
    const babs: string[] = [];
    const split = str.split("");
    for (let i = 0; i < split.length - 2; i++) {
        if (split[i] === split[i + 2] && split[i] !== split[i + 1]) {
            babs.push(split[i + 1] + split[i] + split[i+ 1]);
        }
    }
    return babs;
}

const isIpValid = (ip: string[]) => {
    const babs: string[] = ip.reduce((babs, ipPart, i) => i % 2 == 1 ? babs : babs.concat(...getBabsFromAbas(ipPart)), [] as string[]);
    
    for(const bab of babs) {
        const containsBab = ip.reduce((containsBab, ipPart, i) => i % 2 == 0 ? containsBab : containsBab || ipPart.includes(bab), false);
        if(containsBab) {
            return true;
        }
    }
    return false;
}

const validIps = ips.map((ip) => isIpValid(ip))
    .reduce((sum, valid) => valid ? sum + 1 : sum, 0);
console.log(validIps);