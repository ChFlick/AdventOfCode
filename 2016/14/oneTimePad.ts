import * as crypto from 'crypto';

type PossibleKeyMap = { [i: number]: string }
type TripletByHashMap = { [hash: string]: string }


const RAW_FIVELET_REGEX = "(#)\\1\\1\\1\\1"
const TRIPLET_REGEX = /(.)\1\1/;

const salt = "cuanljph";
const possibleKeys: PossibleKeyMap = {};
const tripletsByHash: TripletByHashMap = {};
const foundKeys: [string, number][] = [];

let i = 0;
while (foundKeys.length < 64) {
    const currentHash: string = crypto.createHash('md5').update(salt + i).digest('hex');
    if (TRIPLET_REGEX.test(currentHash)) {
        possibleKeys[i] = currentHash;
        tripletsByHash[currentHash] = TRIPLET_REGEX.exec(currentHash)[0];
    }

    Object.keys(possibleKeys)
        .filter(n => parseInt(n) + 1001 < i)
        .forEach(n => delete possibleKeys[parseInt(n)]);

    Object.keys(possibleKeys)
        .forEach(n => {
            if(parseInt(n) === i){
                return;
            }
            const hash = possibleKeys[n];
            const triplet = tripletsByHash[hash];
            const regex = new RegExp(RAW_FIVELET_REGEX.replace("#", triplet[0]));
            
            if (regex.test(currentHash)) {
                foundKeys.push([hash, parseInt(n)]);
                delete possibleKeys[parseInt(n)]
            }
        });
    i++;
}

console.log(foundKeys[63][1]);
